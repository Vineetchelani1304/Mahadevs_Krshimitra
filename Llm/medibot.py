import requests

# Define the API endpoint of the Flask backend
API_URL = "http://127.0.0.1:5000/ask"

def ask_medibot(query):
    # Send a POST request to the Flask API
    response = requests.post(API_URL, json={"query": query})
    
    # Handle errors if any
    if response.status_code != 200:
        print("Error:", response.json())
        return None

    # Parse the JSON response
    data = response.json()
    return data["result"], data["source_documents"]

if __name__ == "__main__":
    user_query = input("Write Query Here: ")
    result, sources = ask_medibot(user_query)

    if result:
        print("\n🔹 Medibot Response:\n", result)
        print("\n📌 Source Documents:")
        for idx, source in enumerate(sources, 1):
            print(f"{idx}. {source}")
