const questionInput = document.getElementById("question");

const submitBtn = document.getElementById("submitBtn");

const answer = document.getElementById("answer");

submitBtn.addEventListener("click", async () => {

    const question = questionInput.value.trim();

    if (!question) {
        answer.textContent = "Please enter a question.";
        return;
    }

    answer.textContent = "Thinking...";

    try {

        const response = await fetch("http://localhost:3000/ask-gemini", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        if (!response.ok) {
            answer.textContent = data.error || "Something went wrong.";
            return;
        }

        answer.textContent = data.answer;

    } catch (error) {

        console.error(error);

        answer.textContent = "Could not connect to the backend.";
    }
});