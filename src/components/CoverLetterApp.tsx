"use client";

import { useState } from "react";
import {
    Sparkles,
    Copy,
    CheckCheck,
    Download,
    FileText,
    Check,
    Loader2,
} from "lucide-react";
import type { CoverLetterFormData } from "@/types";
import { templates } from "@/lib/templates";
import { generateCoverLetterPdf } from "@/lib/generatePdf";

// ─── Default form state ───────────────────────────────────────────────────────
const defaultForm: CoverLetterFormData = {
    companyName: "",
    positionName: "",
    hiringManagerName: "",
    customWhyInterested: "",
    senderName: "Ahshanul Haquc",
    currentWorkplace: "Softvence IT Ltd",
    currentDesignation: "Jr. Frontend Developer",
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CoverLetterApp() {
    const [form, setForm] = useState<CoverLetterFormData>(defaultForm);
    const [selectedId, setSelectedId] = useState("standard");
    const [output, setOutput] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [isPdfLoading, setIsPdfLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof CoverLetterFormData, string>>>({});

    const set = (field: keyof CoverLetterFormData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = () => {
        const e: Partial<Record<keyof CoverLetterFormData, string>> = {};
        if (!form.companyName.trim()) e.companyName = "Company name is required";
        if (!form.positionName.trim()) e.positionName = "Position name is required";
        if (!form.senderName.trim()) e.senderName = "Your name is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleGenerate = () => {
        if (!validate()) return;
        const tpl = templates.find((t) => t.id === selectedId)!;
        setOutput(tpl.generate(form));
    };

    const handleCopy = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
    };

    const handleDownloadPdf = async () => {
        if (!output || isPdfLoading) return;
        setIsPdfLoading(true);
        try {
            await generateCoverLetterPdf(output, form.companyName, form.positionName);
        } finally {
            setIsPdfLoading(false);
        }
    };

    const activeTpl = templates.find((t) => t.id === selectedId);

    return (
        <div className="bg-gray-50">
            {/* ── Main Layout ─────────────────────────────────────────────── */}
            <main className=" mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-col md:flex-row gap-6">

                    {/* ── Left: Controls (2/5) ──────────────────────────────── */}
                    <div className="w-full md:w-68 xl:w-88 space-y-4">
                        {/* Form Fields */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">
                                Fill Details
                            </p>

                            <div className="space-y-4">
                                <InputField
                                    label="Company Name"
                                    required
                                    value={form.companyName}
                                    onChange={(v) => set("companyName", v)}
                                    placeholder="e.g. Enosis Solutions"
                                    error={errors.companyName}
                                />
                                <InputField
                                    label="Position / Role"
                                    required
                                    value={form.positionName}
                                    onChange={(v) => set("positionName", v)}
                                    placeholder="e.g. Junior Software Engineer"
                                    error={errors.positionName}
                                />
                                <InputField
                                    label="Hiring Manager"
                                    optional
                                    value={form.hiringManagerName}
                                    onChange={(v) => set("hiringManagerName", v)}
                                    placeholder="e.g. Ms. Sarah Khan"
                                    hint="Blank defaults to Hiring Manager"
                                />

                                {/* Why interested — textarea */}
                                <div>
                                    <div className="flex items-center gap-1 mb-1.5">
                                        <label className="text-sm font-medium text-slate-700">
                                            Why this company?
                                        </label>
                                        <span className="text-xs text-slate-400 font-normal">
                                            (optional)
                                        </span>
                                    </div>
                                    <textarea
                                        value={form.customWhyInterested}
                                        onChange={(e) => set("customWhyInterested", e.target.value)}
                                        placeholder="e.g. its product-first culture and end-to-end ownership model..."
                                        rows={3}
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-400 transition-colors resize-none"
                                    />
                                    <p className="text-xs text-slate-400 mt-1">
                                        A default professional reason is used when left blank.
                                    </p>
                                </div>

                                <InputField
                                    label="Current Workplace"
                                    value={form.currentWorkplace}
                                    onChange={(v) => set("currentWorkplace", v)}
                                    placeholder="e.g. Softvence IT Ltd."
                                    error={errors.currentWorkplace}
                                />
                                <InputField
                                    label="Current Designation"
                                    value={form.currentDesignation}
                                    onChange={(v) => set("currentDesignation", v)}
                                    placeholder="e.g. Junior Frontend Developer"
                                    error={errors.currentDesignation}
                                />

                                <InputField
                                    label="Your Name"
                                    required
                                    value={form.senderName}
                                    onChange={(v) => set("senderName", v)}
                                    placeholder="Your full name"
                                    error={errors.senderName}
                                />

                                <button
                                    onClick={handleGenerate}
                                    className="w-full mt-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold py-3 px-5 rounded-xl transition-all shadow-sm shadow-indigo-200 text-sm"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Generate Cover Letter
                                </button>
                            </div>
                        </div>

                        {/* Template Selector */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
                                Template
                            </p>
                            <div className="space-y-2">
                                {templates.map((tpl) => (
                                    <button
                                        key={tpl.id}
                                        onClick={() => setSelectedId(tpl.id)}
                                        className={`w-full text-left px-3.5 py-3 rounded-xl border-2 transition-all duration-150 ${selectedId === tpl.id
                                            ? "border-indigo-500 bg-indigo-50/70"
                                            : "border-transparent bg-slate-50 hover:bg-slate-100"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* Radio dot */}
                                            <div
                                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${selectedId === tpl.id
                                                    ? "border-indigo-500 bg-indigo-500"
                                                    : "border-slate-300 bg-white"
                                                    }`}
                                            >
                                                {selectedId === tpl.id && (
                                                    <Check
                                                        className="w-2.5 h-2.5 text-white"
                                                        strokeWidth={3}
                                                    />
                                                )}
                                            </div>

                                            {/* Labels */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span
                                                        className={`text-sm font-semibold ${selectedId === tpl.id
                                                            ? "text-indigo-700"
                                                            : "text-slate-700"
                                                            }`}
                                                    >
                                                        {tpl.name}
                                                    </span>
                                                    <span
                                                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${tpl.badgeColor}`}
                                                    >
                                                        {tpl.badge}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-400 mt-0.5 truncate">
                                                    {tpl.description}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Preview (3/5) ─────────────────────────────── */}
                    <div className="grow">
                        {output ? (
                            <div className="space-y-3">
                                {/* Toolbar */}
                                <div className="flex items-center justify-between gap-3 flex-wrap">
                                    <p className="text-xs text-slate-500">
                                        <span className="font-semibold text-slate-700">
                                            {activeTpl?.name}
                                        </span>
                                        <span className="mx-1.5 text-slate-300">·</span>
                                        {output.split(/\s+/).filter(Boolean).length} words
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleCopy}
                                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all duration-200 ${isCopied
                                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                                }`}
                                        >
                                            {isCopied ? (
                                                <>
                                                    <CheckCheck className="w-3.5 h-3.5" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-3.5 h-3.5" />
                                                    Copy Text
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={handleDownloadPdf}
                                            disabled={isPdfLoading}
                                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isPdfLoading ? (
                                                <>
                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    Generating...
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="w-3.5 h-3.5" />
                                                    Download PDF
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Letter Paper */}
                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                    {/* Accent top bar */}
                                    <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

                                    {/* Rendered letter */}
                                    <div className="px-10 py-10">
                                        <LetterPreview content={output} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Empty state */
                            <div className="min-h-[580px] bg-white flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-200">
                                <div className="text-center px-8">
                                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                                        <Sparkles className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <h3 className="text-sm font-semibold text-slate-600 mb-1">
                                        Your cover letter will appear here
                                    </h3>
                                    <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                                        Pick a template, fill in the company and role, then hit{" "}
                                        <strong className="text-slate-500">Generate</strong>.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    required?: boolean;
    optional?: boolean;
    error?: string;
    hint?: string;
}

function InputField({
    label,
    value,
    onChange,
    placeholder,
    required,
    optional,
    error,
    hint,
}: InputFieldProps) {
    return (
        <div>
            <div className="flex items-center gap-1 mb-1.5">
                <label className="text-sm font-medium text-slate-700">{label}</label>
                {required && <span className="text-red-400 text-xs">*</span>}
                {optional && (
                    <span className="text-xs text-slate-400 font-normal">(optional)</span>
                )}
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-400 transition-colors ${error ? "border-red-300 bg-red-50" : "border-slate-200"
                    }`}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            {hint && !error && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
        </div>
    );
}

interface LetterPreviewProps {
    content: string;
}

function LetterPreview({ content }: LetterPreviewProps) {
    const paragraphs = content.split("\n\n");

    return (
        <div className="font-serif text-slate-800">
            {paragraphs.map((para, i) => {
                const trimmed = para.trim();
                if (!trimmed) return null;

                // Closing block: "Sincerely,\nName"
                if (trimmed.startsWith("Sincerely")) {
                    const lines = trimmed.split("\n");
                    return (
                        <div key={i} className="mt-10">
                            <p className="text-[14.5px] leading-relaxed text-slate-700">
                                {lines[0]}
                            </p>
                            {lines.slice(1).map((line, j) =>
                                line.trim() ? (
                                    <p
                                        key={j}
                                        className={`text-[14.5px] leading-relaxed mt-1.5 text-sm text-slate-800`}
                                    >
                                        {line}
                                    </p>
                                ) : null
                            )}
                        </div>
                    );
                }

                // Greeting: "Dear Hiring Manager,"
                if (i === 0) {
                    return (
                        <p
                            key={i}
                            className="text-[14.5px] leading-relaxed text-slate-800 font-medium mb-5"
                        >
                            {trimmed}
                        </p>
                    );
                }

                // Body paragraphs
                return (
                    <p
                        key={i}
                        className="text-[14.5px] leading-[1.8] text-slate-700 mb-4"
                    >
                        {trimmed}
                    </p>
                );
            })}
        </div>
    );
}