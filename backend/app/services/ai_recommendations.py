<<<<<<< HEAD
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
=======
try:
    from langchain_openai import ChatOpenAI
    from langchain.prompts import PromptTemplate
    LANGCHAIN_AVAILABLE = True
except ImportError:
    LANGCHAIN_AVAILABLE = False

>>>>>>> 20fe055 (fix: restore backend server environment and implement high-fidelity checkout demo mode)
from app.core.config import settings

def get_ai_recommendations(user_id: str, prompt: str = ""):
    """
    AI recommendation microservice using LangChain and OpenAI Models.
    """
<<<<<<< HEAD
    if not settings.OPENAI_API_KEY:
        # Graceful fallback if no API key is set in .env
        return {
            "status": "mock",
            "message": "Valid OPENAI_API_KEY missing, returning fallback mock LangChain recommendation data.",
=======
    if not LANGCHAIN_AVAILABLE or not settings.OPENAI_API_KEY:
        # Graceful fallback if no API key is set in .env or library is missing
        return {
            "status": "mock",
            "message": "AI dependencies or API key missing, returning fallback mock data.",
>>>>>>> 20fe055 (fix: restore backend server environment and implement high-fidelity checkout demo mode)
            "recommendations": [
                {"name": "Half Running Sect", "reason": "Consistent with trend preferences"}, 
                {"name": "Winter Comfort Bundle", "reason": "High correlation with previous queries"}
            ]
        }
<<<<<<< HEAD
        
    try:
=======
    
    try:
        # ... logic ...
>>>>>>> 20fe055 (fix: restore backend server environment and implement high-fidelity checkout demo mode)
        llm = ChatOpenAI(temperature=0.7, model="gpt-4", openai_api_key=settings.OPENAI_API_KEY)
        
        template = """
        You are a senior fashion and E-commerce AI assistant for SmartShop.
        Based on the user's implicit history (ID: {user_id}) and query: "{prompt}",
        suggest 3 cutting-edge products they might like. Format them as a JSON list of objects consisting of 'name' and 'reason'.
        """
        
        prompt_template = PromptTemplate(template=template, input_variables=["user_id", "prompt"])
        
        chain = prompt_template | llm
        
        # Invoke LangChain execution
        result = chain.invoke({"user_id": user_id, "prompt": prompt})
        
        return {
            "status": "success",
            "ai_response": result.content
        }
    except Exception as e:
        return {"error": str(e)}
