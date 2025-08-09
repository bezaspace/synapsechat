#!/usr/bin/env python3
"""
Simple test script to verify the backend setup is working correctly.
"""

import os
import sys
from dotenv import load_dotenv

def test_environment():
    """Test environment configuration."""
    print("🔍 Testing environment setup...")
    
    # Load environment variables
    load_dotenv()
    
    # Check for required environment variables
    api_key = os.getenv('GOOGLE_API_KEY')
    use_vertex = os.getenv('GOOGLE_GENAI_USE_VERTEXAI', 'FALSE')
    
    if not api_key or api_key == 'your_google_api_key_here':
        print("❌ GOOGLE_API_KEY not set or still using placeholder")
        print("   Please update backend/.env with your actual Google API key")
        return False
    
    print(f"✅ GOOGLE_API_KEY configured (length: {len(api_key)})")
    print(f"✅ GOOGLE_GENAI_USE_VERTEXAI: {use_vertex}")
    return True

def test_imports():
    """Test that all required packages can be imported."""
    print("\n🔍 Testing package imports...")
    
    try:
        import fastapi
        print(f"✅ FastAPI: {fastapi.__version__}")
    except ImportError as e:
        print(f"❌ FastAPI import failed: {e}")
        return False
    
    try:
        import uvicorn
        print(f"✅ Uvicorn available")
    except ImportError as e:
        print(f"❌ Uvicorn import failed: {e}")
        return False
    
    try:
        from google.adk.agents import Agent
        print("✅ Google ADK available")
    except ImportError as e:
        print(f"❌ Google ADK import failed: {e}")
        print("   Make sure you've installed: pip install google-adk")
        return False
    
    return True

def test_agent_creation():
    """Test that the agent can be created."""
    print("\n🔍 Testing agent creation...")
    
    try:
        from neurosurgery_agent.agent import root_agent
        print("✅ Neurosurgery agent imported successfully")
        print(f"   Agent name: {root_agent.name}")
        print(f"   Model: {root_agent.model}")
        return True
    except Exception as e:
        print(f"❌ Agent creation failed: {e}")
        return False

def main():
    """Run all tests."""
    print("🚀 Backend Setup Test\n")
    
    tests = [
        test_environment,
        test_imports,
        test_agent_creation
    ]
    
    results = []
    for test in tests:
        try:
            result = test()
            results.append(result)
        except Exception as e:
            print(f"❌ Test failed with exception: {e}")
            results.append(False)
    
    print(f"\n📊 Test Results: {sum(results)}/{len(results)} passed")
    
    if all(results):
        print("🎉 All tests passed! Your backend setup is ready.")
        print("\nNext steps:")
        print("1. Run the backend: python main.py")
        print("2. Test the API: http://localhost:8001/docs")
    else:
        print("⚠️  Some tests failed. Please fix the issues above.")
        sys.exit(1)

if __name__ == "__main__":
    main()