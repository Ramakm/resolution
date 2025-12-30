import React from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw } from 'lucide-react';

const MonthCard = ({ monthData, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="month-card"
            style={{
                background: 'var(--surface-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                marginBottom: '2rem',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border-color)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                background: 'var(--accent-color)',
                opacity: 0.1
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    color: 'var(--text-primary)',
                    margin: 0
                }}>
                    {monthData.month}
                </h3>
                <span style={{
                    fontSize: '0.9rem',
                    color: 'var(--accent-color)',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    opacity: 0.8
                }}>
                    {monthData.theme}
                </span>
            </div>

            <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
            }}>
                {monthData.tasks.map((task, i) => (
                    <li key={i} style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.75rem',
                        color: 'var(--text-secondary)',
                        fontSize: '1rem'
                    }}>
                        <span style={{
                            display: 'block',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: 'var(--text-tertiary)',
                            flexShrink: 0,
                            marginTop: '0.6em' // Visual alignment
                        }} />
                        {task}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

const Calendar = ({ plan, onReset }) => {
    if (!plan || plan.length === 0) return null;

    return (
        <div className="calendar-container" style={{
            maxWidth: 'var(--container-width)',
            margin: '0 auto',
            padding: '4rem 1.5rem',
            paddingBottom: '8rem'
        }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '3rem'
                }}
            >
                <div>
                    <h2 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '2rem',
                        color: 'var(--text-primary)',
                        marginBottom: '0.5rem'
                    }}>
                        Your Year Ahead
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>A focused path forward.</p>
                </div>

                <button
                    onClick={onReset}
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--border-color)',
                        padding: '0.5rem',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        color: 'var(--text-secondary)',
                        transition: 'all 0.2s'
                    }}
                    title="Start Over"
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--text-primary)';
                        e.currentTarget.style.borderColor = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                >
                    <RefreshCw size={20} />
                </button>
            </motion.div>

            <div className="months-grid">
                {plan.map((month, index) => (
                    <MonthCard key={index} monthData={month} index={index} />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                style={{
                    textAlign: 'center',
                    marginTop: '4rem',
                    color: 'var(--text-tertiary)',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic'
                }}
            >
                "The best way to predict the future is to create it."
            </motion.div>
        </div>
    );
};

export default Calendar;
