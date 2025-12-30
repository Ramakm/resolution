/**
 * LLM Service for Resolution Planner
 * Handles API calls to Gemini, OpenAI, and DeepSeek.
 */

const SYSTEM_PROMPT = `
You are an expert life coach and strategic planner.
Your goal is to take a user's New Year resolution and break it down into a realistic, motivating 12-month plan.

Output MUST be a JSON array of objects, where each object represents a month.
Format:
[
  {
    "month": "January",
    "theme": "Month Title/Theme",
    "tasks": ["Action item 1", "Action item 2", "Action item 3"]
  }
]

Rules:
1. Provide exactly 12 months, starting from January.
2. "theme" should be short (2-4 words) and inspiring.
3. Provide 3-5 "tasks" per month. Tasks should be specific, actionable, and achievable.
4. Include rest/reflection periods. Don't make every month intense.
5. Tone: Encouraging, minimalist, essentialist.
6. RETURN ONLY JSON. NO COMMENTARY.
`;

export const generatePlan = async (resolution, provider, apiKey) => {
    try {
        if (provider === 'gemini') {
            return await callGemini(resolution, apiKey);
        } else if (provider === 'openai') {
            return await callOpenAI(resolution, apiKey, 'gpt-4o');
        } else if (provider === 'deepseek') {
            return await callDeepSeek(resolution, apiKey);
        }
    } catch (error) {
        console.error("LLM Generation Error:", error);
        throw new Error("Failed to generate plan. Please check your API key and try again.");
    }
};

const cleanJSON = (text) => {
    // Remove markdown code blocks if present
    let clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(clean);
};

const callGemini = async (resolution, key) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;

    const payload = {
        contents: [{
            parts: [{
                text: `${SYSTEM_PROMPT}\n\nUser Resolution: "${resolution}"`
            }]
        }]
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || 'Gemini API Error');
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    return cleanJSON(text);
};

const callOpenAI = async (resolution, key, model) => {
    const url = 'https://api.openai.com/v1/chat/completions';

    const payload = {
        model: model,
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `Resolution: "${resolution}"` }
        ],
        temperature: 0.7
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || 'OpenAI API Error');
    }

    const data = await response.json();
    return cleanJSON(data.choices[0].message.content);
};

const callDeepSeek = async (resolution, key) => {
    // DeepSeek is OpenAI compatible
    const url = 'https://api.deepseek.com/chat/completions';

    const payload = {
        model: "deepseek-chat",
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `Resolution: "${resolution}"` }
        ],
        temperature: 0.7
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        // DeepSeek sometimes returns plain text errors or different structure
        const text = await response.text();
        throw new Error(`DeepSeek API Error: ${text}`);
    }

    const data = await response.json();
    return cleanJSON(data.choices[0].message.content);
};
