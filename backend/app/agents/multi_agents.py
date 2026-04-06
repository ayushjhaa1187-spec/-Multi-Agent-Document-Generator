from crewai import Agent
from langchain_openai import ChatOpenAI
import os

def create_agents():
    # Model configuration
    llm = ChatOpenAI(
        model=os.getenv("OPENAI_MODEL_NAME", "gpt-4-turbo"),
        openai_api_key=os.getenv("OPENAI_API_KEY")
    )

    # 1. The Research-Focused Drafter
    drafter = Agent(
        role='Senior Technical Documentation Specialist',
        goal='Create comprehensive first drafts of project documentation based on raw project inputs',
        backstory="""You are an expert at extracting requirements and technical details from fragmented notes. 
        You excel at structuring Business Requirement Documents (BRDs) and technical specifications with clarity and precision.""",
        verbose=True,
        allow_delegation=False,
        llm=llm
    )

    # 2. The Critical Reviewer
    reviewer = Agent(
        role='Quality Assurance & Compliance Officer',
        goal='Review documentation for technical gaps, inconsistencies, and alignment with industry standards',
        backstory="""You have a sharp eye for detail and a background in systems architecture. 
        Your job is to find flaws in logic, missing edge cases, and ensure the documentation is bulletproof.""",
        verbose=True,
        allow_delegation=True, # Reviewer can ask Drafter for clarifications
        llm=llm
    )

    # 3. The Final Polish Editor
    editor = Agent(
        role='Chief Content Strategist',
        goal='Finalize the document by ensuring a consistent professional tone, perfect formatting, and concise language',
        backstory="""You are the master of presentation. You take technically sound documents and make them readable for 
        both engineers and C-level executives. You ensure the final output is ready for immediate presentation.""",
        verbose=True,
        allow_delegation=False,
        llm=llm
    )

    return [drafter, reviewer, editor]
