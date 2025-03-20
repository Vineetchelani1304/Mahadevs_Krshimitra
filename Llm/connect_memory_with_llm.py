from flask import Flask, request, jsonify, render_template
import os
from langchain_huggingface import HuggingFaceEndpoint
from langchain.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv, find_dotenv

# Load environment variables
load_dotenv(find_dotenv())

app = Flask(__name__, template_folder="templates", static_folder="static")

# Load Hugging Face API Token and Model
HF_TOKEN = os.environ.get("HF_TOKEN")
HUGGINGFACE_REPO_ID = "mistralai/Mistral-7B-Instruct-v0.3"

# Initialize LLM with shorter max length
def load_llm():
    return HuggingFaceEndpoint(
        repo_id=HUGGINGFACE_REPO_ID,
        temperature=0.5,
        model_kwargs={"token": HF_TOKEN, "max_length": 128}  # Reduced max_length for shorter responses
    )

# Define Custom Prompt (Modified for Concise Responses)
CUSTOM_PROMPT_TEMPLATE = """
Use the dataset information below to answer the user's query **briefly**.
Keep the answer **short (3-4 sentences max)** but still informative.

**Dataset Information:**  
{context}

**User's Question:**  
{question}

### **Answer:**  
- **Mention the best crops (if applicable).**  
- **Give a short note on pH, nitrogen, phosphorus, potassium levels.**  
- **Answer in 3-4 sentences max.**  

**If the dataset lacks relevant information, say:**
"I don't have enough data on this."
"""

# Load FAISS Database
DB_FAISS_PATH = "vectorstore/db_faiss"
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Check if FAISS database exists
if os.path.exists(DB_FAISS_PATH):
    print("✅ Loading FAISS database...")
    db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)
else:
    print("❌ FAISS database not found. Please run the CSV processing script first.")
    exit()

# Create Retrieval Chain with reduced k value
qa_chain = RetrievalQA.from_chain_type(
    llm=load_llm(),
    chain_type="stuff",
    retriever=db.as_retriever(search_kwargs={'k': 3}),  # Reduced k for fewer sources
    return_source_documents=True,
    chain_type_kwargs={'prompt': PromptTemplate(template=CUSTOM_PROMPT_TEMPLATE, input_variables=["context", "question"])},
)

# **Render UI**
@app.route("/")
def home():
    return render_template("index.html")

# **Handle User Queries**
@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    user_query = data.get("query", "").strip().lower()

    # ✅ **Handle casual greetings separately**
    greeting_responses = {
    "hi": "Hello! How can I assist you today?",
    "hello": "Hey there! What would you like to know?",
    "hey": "Hi! How can I help you?",
    "how are you": "I'm just a bot, but I'm here to help with crop recommendations!",
    "what's up": "Not much! Just waiting to help you with crop-related queries.",
    "good morning": "Good morning! Hope you have a great day ahead. How can I help?",
    "good afternoon": "Good afternoon! How can I assist you today?",
    "good evening": "Good evening! Let me know how I can help.",
    "hey there": "Hey there! What’s on your mind?",
    "hi there": "Hi there! How can I assist?",
    "hello there": "Hello there! How can I help you today?",
    "howdy": "Howdy! What can I do for you?",
    "greetings": "Greetings! How may I assist you?",
    "what's new": "Not much! Just here to assist with your crop-related queries.",
    "yo": "Yo! How can I help you?",
    "sup": "Not much! What do you need help with?",
    "how's it going": "I'm here and ready to assist! What’s your query?",
    "how’s life": "As a bot, life is all about helping you with crops!",
}

    
    # ✅ **Check if the question is a general greeting**
    if user_query in greeting_responses:
        return jsonify({"response": greeting_responses[user_query]})

    # ✅ **Pass only relevant queries to the retrieval system**
    response = qa_chain.invoke({'query': user_query})
    
    return jsonify({
        "response": response["result"],
        "source_documents": [doc.page_content for doc in response["source_documents"]]
    })

# Run the Flask App
if __name__ == "__main__":
    app.run(debug=True, port=5000)
