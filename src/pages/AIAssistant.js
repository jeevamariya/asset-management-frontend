import { useEffect, useState } from "react";

import api from "../api/api";

function AIAssistant() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchConversations = async () => {
    try {
      const response = await api.get(
        "/ai/conversations/"
      );

      setConversations(response.data);
    } catch (error) {
      setError("Unable to load chat history.");
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleSend = async (event) => {
    event.preventDefault();

    if (!prompt.trim()) {
      return;
    }

    const userMessage = {
      role: "user",
      content: prompt,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    const currentPrompt = prompt;

    setPrompt("");
    setLoading(true);
    setError("");

    try {
      const response = await api.post(
        "/ai/chat/",
        {
          prompt: currentPrompt,
          conversation_id: conversationId,
        }
      );

      setConversationId(
        response.data.conversation_id
      );

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: response.data.response,
        },
      ]);

      fetchConversations();
    } catch (error) {
      setError("Unable to generate AI response.");
    } finally {
      setLoading(false);
    }
  };

  const handleConversationClick = (
    conversation
  ) => {
    setConversationId(conversation.id);
    setMessages(conversation.messages);
    setError("");
  };

  const handleNewChat = () => {
    setConversationId(null);
    setMessages([]);
    setPrompt("");
    setError("");
  };

  return (
    <div className="ai-page">
      <div className="ai-sidebar">
        <button onClick={handleNewChat}>
          New Chat
        </button>

        <h3>Chat History</h3>

        {conversations.map((conversation) => (
            <button
            key={conversation.id}
            className={
                conversationId === conversation.id
                ? "active-conversation"
                : ""
            }
            onClick={() =>
                handleConversationClick(conversation)
            }
            >
            {conversation.title || "New Chat"}
            </button>
        ))}
      </div>

      <div className="ai-chat">
        <h1>AI Assistant</h1>

        <div className="ai-messages">
          {messages.length === 0 && (
            <div className="ai-empty-state">
                <h2>How can I help you?</h2>
                <p>
                Ask me something about your asset management system.
                </p>
            </div>
            )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`ai-message ${message.role}`}
            >
              <strong>
                {message.role === "user"
                  ? "You"
                  : "AI"}
              </strong>

              <p>{message.content}</p>
            </div>
          ))}

          {loading && (
            <div className="ai-message assistant">
              <strong>AI</strong>
              <p>Thinking...</p>
            </div>
          )}
        </div>

        {error && <p>{error}</p>}

        <form
          className="ai-input-form"
          onSubmit={handleSend}
        >
          <input
            type="text"
            value={prompt}
            onChange={(event) =>
              setPrompt(event.target.value)
            }
            placeholder="Ask something..."
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default AIAssistant;