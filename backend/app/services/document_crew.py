from crewai import Crew, Task, Process
from .agents.multi_agents import create_agents
import os

class DocumentationCrew:
    def __init__(self, raw_input, doc_type="BRD"):
        self.raw_input = raw_input
        self.doc_type = doc_type
        self.agents = create_agents()

    def run(self, process_type="sequential"):
        drafter, reviewer, editor = self.agents
        
        # Define tasks
        draft_task = Task(
            description=f"Draft a comprehensive {self.doc_type} based on: {self.raw_input}. Include sections for Goal, Features, and Architecture.",
            agent=drafter,
            expected_output="A well-structured markdown draft of the document."
        )

        review_task = Task(
            description=f"Review the drafted {self.doc_type}. Focus on technical accuracy, consistency, and identifying edge cases that may have been missed.",
            agent=reviewer,
            expected_output="A list of technical critiques and suggested improvements to the draft."
        )

        finalize_task = Task(
            description=f"Incorporate feedback and produce the final {self.doc_type} in polished markdown. Ensure a professional tone and clear structure.",
            agent=editor,
            expected_output=f"The final {self.doc_type} ready for markdown export."
        )

        # Crew configuration
        crew = Crew(
            agents=self.agents,
            tasks=[draft_task, review_task, finalize_task],
            process=Process.sequential if process_type == "sequential" else Process.hierarchical,
            verbose=True
        )

        return crew.kickoff()
