import React, { useState, useEffect } from 'react';
import helwanGov from '../assets/helwan-gov.png';
import newLogo from '../assets/new_logo.png';
import helwanTech from '../assets/helwan-tech.png';
import govBg from '../assets/WhatsApp Image 2025-12-05 at 17.09.44_2414c0af.jpg';
import '../styles/FormPage.css';

const universityConfig = {
    government: {
        title: 'جامعة حلوان الحكومية',
        logo: helwanGov,
        emailPlaceholder: 'example@student.helwan.edu.eg',
        faculties: [
            { value: 'engineering', label: 'كلية الهندسة' },
            { value: 'commerce', label: 'كلية التجارة' },
            { value: 'arts', label: 'كلية الآداب' },
            { value: 'science', label: 'كلية العلوم' },
            { value: 'law', label: 'كلية الحقوق' },
            { value: 'education', label: 'كلية التربية' },
            { value: 'pharmacy', label: 'كلية الصيدلة' },
            { value: 'applied-arts', label: 'كلية الفنون التطبيقية' },
            { value: 'fine-arts', label: 'كلية الفنون الجميلة' },
            { value: 'social-work', label: 'كلية الخدمة الاجتماعية' },
            { value: 'other', label: 'أخرى' },
        ],
        backgroundImage: govBg,
    },
    private: {
        title: 'جامعة حلوان الأهلية',
        logo: newLogo,
        emailPlaceholder: 'example@hnu.edu.eg',
        faculties: [
            { value: 'engineering', label: 'كلية الهندسة' },
            { value: 'business', label: 'كلية إدارة الأعمال' },
            { value: 'pharmacy', label: 'كلية الصيدلة' },
            { value: 'applied-arts', label: 'كلية الفنون التطبيقية' },
            { value: 'physical-therapy', label: 'كلية العلاج الطبيعي' },
            { value: 'other', label: 'أخرى' },
        ],
        backgroundImage: govBg,
    },
    tech: {
        title: 'جامعة حلوان التكنولوجية',
        logo: helwanTech,
        emailPlaceholder: 'example@htu.edu.eg',
        faculties: [
            { value: 'engineering-tech', label: 'كلية الهندسة والتكنولوجيا' },
            { value: 'industrial-education', label: 'كلية التعليم الصناعي' },
            { value: 'applied-health', label: 'كلية العلوم الصحية التطبيقية' },
            { value: 'business-tech', label: 'كلية إدارة الأعمال التكنولوجية' },
            { value: 'other', label: 'أخرى' },
        ],
        backgroundImage: govBg,
    },
};

export default function FormPage({ university, onBack }) {
    const config = universityConfig[university];

    const [formData, setFormData] = useState({
        studentName: '',
        studentId: '',
        faculty: '',
        year: '',
        email: '',
        type: 'suggestion',
        title: '',
        content: '',
    });

    const [charCount, setCharCount] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onBack();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onBack]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === 'content') {
            const len = value.length;
            setCharCount(len);
        }
    };

    const handleTypeChange = (type) => {
        setFormData((prev) => ({ ...prev, type }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (
            !formData.studentName ||
            !formData.studentId ||
            !formData.faculty ||
            !formData.year ||
            !formData.email ||
            !formData.title ||
            !formData.content
        ) {
            alert('برجاء ملء جميع الحقول المطلوبة');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            alert('برجاء إدخال بريد إلكتروني صحيح');
            return;
        }

        if (formData.content.length < 10) {
            alert('برجاء كتابة تفاصيل أكثر (على الأقل 10 أحرف)');
            return;
        }

        // Simulate success
        setShowSuccess(true);

        // Reset after delay
        setTimeout(() => {
            setShowSuccess(false);
            onBack();
        }, 3000);
    };

    const handleReset = () => {
        setFormData({
            studentName: '',
            studentId: '',
            faculty: '',
            year: '',
            email: '',
            type: 'suggestion',
            title: '',
            content: '',
        });
        setCharCount(0);
    };

    if (showSuccess) {
        return (
            <div className="success-message">
                <div>✓</div>
                <div>تم إرسال مشاركتك بنجاح!</div>
                <div>سيتم الرد عليك قريباً عبر البريد الإلكتروني</div>
            </div>
        );
    }

    const years = [
        { value: '1', label: 'الفرقة الأولى' },
        { value: '2', label: 'الفرقة الثانية' },
        { value: '3', label: 'الفرقة الثالثة' },
        { value: '4', label: 'الفرقة الرابعة' },
        { value: '5', label: 'الفرقة الخامسة' },
    ];

    return (
        <div
            className={`form-page-container ${university === 'tech' ? 'gradient-bg' : ''
                }`}
            style={
                university !== 'tech'
                    ? { backgroundImage: `url(${config.backgroundImage})` }
                    : {}
            }
        >
            {/* Overlay */}
            <div className="bg-overlay"></div>

            {/* Header */}
            <header className="form-header">
                <button className="back-btn" onClick={onBack}>
                    ← العودة
                </button>
                <div className="university-info">
                    <img src={config.logo} alt={config.title} className="university-logo" />
                    <h1>{config.title}</h1>
                </div>
                <h2 className="logo">قريبين</h2>
                <p className="subtitle">شاركنا اقتراحاتك</p>
            </header>

            {/* Main Form Card */}
            <main className="form-card">
                <h2 className="form-title">البيانات الشخصية</h2>
                <div className="form-fields">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="studentId">
                                رقم الطالب <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="studentId"
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleInputChange}
                                required
                                placeholder="أدخل رقمك الجامعي"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="studentName">
                                الاسم بالكامل <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="studentName"
                                name="studentName"
                                value={formData.studentName}
                                onChange={handleInputChange}
                                required
                                placeholder="أدخل اسمك الكامل"
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="year">
                                الفرقة الدراسية <span className="required">*</span>
                            </label>
                            <select
                                id="year"
                                name="year"
                                value={formData.year}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">اختر الفرقة</option>
                                {years.map((y) => (
                                    <option key={y.value} value={y.value}>
                                        {y.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="faculty">
                                الكلية <span className="required">*</span>
                            </label>
                            <select
                                id="faculty"
                                name="faculty"
                                value={formData.faculty}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">اختر الكلية</option>
                                {config.faculties.map((f) => (
                                    <option key={f.value} value={f.value}>
                                        {f.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">
                            البريد الإلكتروني <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder={config.emailPlaceholder}
                        />
                        <small className="helper-text">سيتم إرسال الرد على هذا البريد الإلكتروني</small>
                    </div>
                </div>

                {/* Type */}
                <div className="form-section">
                    <h3 className="section-title">نوع المشاركة</h3>
                    <div className="radio-group">
                        {[
                            { value: 'suggestion', label: 'اقتراح' },
                            { value: 'inquiry', label: 'استفسار' },
                        ].map((item) => (
                            <label key={item.value} className="radio-label">
                                <input
                                    type="radio"
                                    name="type"
                                    value={item.value}
                                    checked={formData.type === item.value}
                                    onChange={() => handleTypeChange(item.value)}
                                />
                                <span className="radio-custom"></span>
                                <span className="radio-text">{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="form-section">
                    <h3 className="section-title">المحتوى</h3>
                    <div className="form-group">
                        <label htmlFor="title">
                            العنوان <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            placeholder="عنوان مختصر للموضوع"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">
                            التفاصيل <span className="required">*</span>
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            required
                            placeholder={`اكتب تفاصيل اقتراحك أو شكواك هنا...\n\nنرجو منك توضيح الموضوع بشكل مفصل لنتمكن من خدمتك بشكل أفضل`}
                        />
                        <small className={`helper-text character-count ${charCount > 1800 ? 'warning' : ''
                            }`}>
                            {charCount} / 2000 حرف
                        </small>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn" onClick={handleSubmit}>
                        إرسال المشاركة
                    </button>
                    <button type="reset" className="reset-btn" onClick={handleReset}>
                        مسح البيانات
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer>
                <p>© 2025 قريبين - جميع الحقوق محفوظة</p>
            </footer>
        </div>
    );
}