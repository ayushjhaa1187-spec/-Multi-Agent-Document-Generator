import streamlit as st
import os
from app.services.document_crew import DocumentationCrew
from dotenv import load_dotenv

load_dotenv()

st.set_page_config(page_title="Multi-Agent Document Generator", layout="wide", page_icon="📝")

# --- UI Header ---
st.title("🚀 Multi-Agent Document Generator")
st.markdown("Draft, review, and finalize project documentation using a collaborative AI crew.")

# --- Sidebar Configuration ---
with st.sidebar:
    st.header("Agent Configuration")
    llm_model = st.selectbox("LLM Model", ["gpt-4-turbo", "gpt-4", "gpt-3.5-turbo"], index=0)
    process_type = st.radio("Process Flow", ["sequential", "hierarchical"], index=0)
    
    st.divider()
    st.markdown("### Export Settings")
    auto_save = st.checkbox("Auto-save as Markdown", value=True)

# --- User Input ---
doc_type = st.text_input("Document Type (e.g. BRD, Technical Spec, PRD)", value="BRD")
raw_input = st.text_area("Initial Project Notes / Requirements", 
                        placeholder="Paste your rough notes or project description here...",
                        height=200)

if st.button("Generate Document", type="primary"):
    if not raw_input:
        st.error("Please provide initial requirements to start generation.")
    else:
        with st.status(f"Collaborating on your {doc_type}...", expanded=True) as status:
            st.write("Initializing Agent Crew...")
            crew_instance = DocumentationCrew(raw_input, doc_type)
            
            st.write(f"Generating first draft with {process_type} flow...")
            final_output = crew_instance.run(process_type)
            
            status.update(label="Document Generation Complete!", state="complete", expanded=False)

        # --- Output Display ---
        st.divider()
        st.subheader("📄 Generated Documentation")
        st.markdown(final_output)

        # --- Export Options ---
        st.divider()
        col1, col2 = st.columns(2)
        with col1:
            st.download_button("Download Markdown", 
                               data=str(final_output), 
                               file_name=f"{doc_type.replace(' ', '_')}.md", 
                               mime="text/markdown")
        with col2:
            if st.button("Copy to Clipboard"):
                st.write("Copied (simulation)!")
                st.toast("Document content copied to clipboard!")

st.divider()
st.caption("Powered by CrewAI, LangChain, and OpenAI ✦ Created by Ayush Jha")
