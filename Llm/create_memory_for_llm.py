import os
from langchain_community.document_loaders import CSVLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface.embeddings import HuggingFaceEmbeddings  
from dotenv import load_dotenv, find_dotenv

# Load environment variables
load_dotenv(find_dotenv())

# Step 1: Load CSV Files
DATA_PATH = "data/"

def load_csv_files(data_path):
    all_documents = []

    for file in os.listdir(data_path):
        if file.endswith(".csv"):
            file_path = os.path.join(data_path, file)
            csv_loader = CSVLoader(file_path)
            csv_documents = csv_loader.load()
            all_documents.extend(csv_documents)

    return all_documents

documents = load_csv_files(DATA_PATH)
print(f"Loaded CSV Documents: {len(documents)}")

# Step 2: Create Chunks
def create_chunks(extracted_data):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    text_chunks = text_splitter.split_documents(extracted_data)
    return text_chunks

text_chunks = create_chunks(documents)
print(f"Created Text Chunks: {len(text_chunks)}")

# Step 3: Create Vector Embeddings 
def get_embedding_model():
    return HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

embedding_model = get_embedding_model()

# Step 4: Store embeddings in FAISS
DB_FAISS_PATH = "vectorstore/db_faiss"

#  Prevent Overwriting FAISS DB if it Exists
if os.path.exists(DB_FAISS_PATH):
    print("FAISS database already exists. Loading existing DB...")
    db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)
else:
    print("Creating a new FAISS vectorstore...")
    db = FAISS.from_documents(text_chunks, embedding_model)
    db.save_local(DB_FAISS_PATH)

print("✅ FAISS Vectorstore is ready!")
