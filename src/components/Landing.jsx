import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const Landing = ({ onGenerate, error }) => {
    const [resolution, setResolution] = useState('');
    const [provider, setProvider] = useState('gemini');
    const [apiKey, setApiKey] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resolution || !apiKey) return;

        setLoading(true);
        await onGenerate({ resolution, provider, apiKey });
        setLoading(false);
    };

    return (
        <div className="landing-container" style={{
            maxWidth: 'var(--container-width)',
            margin: '0 auto',
            padding: '4rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem'
        }}>
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center' }}
            >
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    <Sparkles size={16} />
                    <span>Intentional Planning</span>
                </div>
                <h1 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.5rem',
                    lineHeight: 1.2,
                    marginBottom: '1rem',
                    color: 'var(--text-primary)'
                }}>
                    Turn one resolution into a<br />year-long plan.
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    No signup. No tracking. Just your goal and a plan.
                </p>
            </motion.header>

            {error && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{
                        background: '#fee2e2',
                        color: '#991b1b',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}
                >
                    {error}
                </motion.div>
            )}

            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                        Your Resolution
                    </label>
                    <textarea
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                        placeholder="Example: I want to get fit and stay consistent this year..."
                        rows={3}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            background: 'var(--surface-color)',
                            fontSize: '1rem',
                            resize: 'none',
                            transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                            LLM Provider
                        </label>
                        <select
                            value={provider}
                            onChange={(e) => setProvider(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)',
                                background: 'var(--surface-color)',
                                fontSize: '0.95rem'
                            }}
                        >
                            <option value="gemini">Google Gemini</option>
                            <option value="openai">OpenAI (GPT-4)</option>
                            <option value="deepseek">DeepSeek</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                            API Key
                        </label>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="sk-..."
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)',
                                background: 'var(--surface-color)',
                                fontSize: '0.95rem'
                            }}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !resolution || !apiKey}
                    style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--accent-color)',
                        color: '#fff',
                        border: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        cursor: loading || !resolution || !apiKey ? 'not-allowed' : 'pointer',
                        opacity: loading || !resolution || !apiKey ? 0.7 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'background 0.2s'
                    }}
                >
                    {loading ? 'Generating Plan...' : 'Generate My Calendar'}
                    {!loading && <ArrowRight size={18} />}
                </button>

                <p style={{
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    color: 'var(--text-tertiary)',
                    marginTop: '-0.5rem'
                }}>
                    Your API key is never stored. It is used only for this session.
                </p>
            </motion.form>
        </div>
    );
};

export default Landing;
