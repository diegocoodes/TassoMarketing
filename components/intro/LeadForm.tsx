"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, Send, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { LeadFormStep } from "@/components/intro/LeadFormStep";
import { getWhatsAppUrl } from "@/config/site";
import {
  advertisingOptions,
  objectiveOptions,
  serviceOptions,
} from "@/data/leadFormOptions";

type LeadFormProps = {
  onClose: () => void;
};

type FormValues = {
  name: string;
  company: string;
  segment: string;
  location: string;
  profile: string;
  service: string;
  advertising: string;
  objective: string;
  bestTime: string;
  notes: string;
};

const initialValues: FormValues = {
  name: "",
  company: "",
  segment: "",
  location: "",
  profile: "",
  service: "",
  advertising: "",
  objective: "",
  bestTime: "",
  notes: "",
};

const inputClasses =
  "mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-white/20 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[rgba(245,169,0,0.12)]";

function buildLeadMessage(values: FormValues) {
  return [
    "Olá, T. Thales! Preenchi o formulário da Universo Marketing.",
    "",
    `Nome: ${values.name}`,
    `Empresa: ${values.company}`,
    `Segmento: ${values.segment}`,
    `Cidade ou região: ${values.location}`,
    `Instagram ou site: ${values.profile}`,
    `Serviço de interesse: ${values.service}`,
    `Já anuncia: ${values.advertising}`,
    `Principal objetivo: ${values.objective}`,
    `Melhor horário: ${values.bestTime}`,
    `Observações: ${values.notes || "Não informado"}`,
    "",
    "Gostaria de receber uma análise do meu negócio.",
  ].join("\n");
}

export function LeadForm({ onClose }: LeadFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  function updateValue(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) {
      return;
    }
    setDirection(1);
    setStep((current) => Math.min(current + 1, 3));
  }

  function goBack() {
    setDirection(-1);
    setStep((current) => Math.max(current - 1, 0));
  }

  const whatsappUrl = getWhatsAppUrl(buildLeadMessage(values));

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-form-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-end justify-center bg-black/80 p-0 backdrop-blur-md sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.99 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="safe-bottom max-h-[100svh] w-full overflow-y-auto rounded-t-[1.75rem] border border-white/10 bg-[#0d0d10] sm:max-h-[92svh] sm:max-w-3xl sm:rounded-[1.75rem]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/8 bg-[rgba(13,13,16,0.94)] px-5 py-4 backdrop-blur-lg sm:px-7">
          <div>
            <p className="type-caption text-[var(--color-gold-light)]">
              Etapa {String(step + 1).padStart(2, "0")} de 04
            </p>
            <h2 id="lead-form-title" className="font-display type-section-subtitle mt-1 text-white">
              {["Sobre o negócio", "Presença atual", "Objetivos", "Revise e envie"][step]}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar formulário"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-white/20 hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="h-1 bg-white/5"><motion.div className="h-full origin-left bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)]" animate={{ scaleX: (step + 1) / 4 }} transition={{ duration: 0.3 }} /></div>
        <div className="p-5 sm:p-7">
          <AnimatePresence mode="wait" initial={false}>
            {step === 0 ? (
              <LeadFormStep key="business" stepKey="business" direction={direction}>
                <form onSubmit={handleNext}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-medium text-zinc-300">Nome<input required autoComplete="name" value={values.name} onChange={(e) => updateValue("name", e.target.value)} className={inputClasses} placeholder="Seu nome" /></label>
                    <label className="text-sm font-medium text-zinc-300">Nome da empresa<input required autoComplete="organization" value={values.company} onChange={(e) => updateValue("company", e.target.value)} className={inputClasses} placeholder="Sua empresa" /></label>
                    <label className="text-sm font-medium text-zinc-300 sm:col-span-2">Segmento do negócio<input required value={values.segment} onChange={(e) => updateValue("segment", e.target.value)} className={inputClasses} placeholder="Ex.: clínica, varejo, serviços" /></label>
                  </div>
                  <StepActions />
                </form>
              </LeadFormStep>
            ) : step === 1 ? (
              <LeadFormStep key="presence" stepKey="presence" direction={direction}>
                <form onSubmit={handleNext}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-medium text-zinc-300">Cidade ou região<input required autoComplete="address-level2" value={values.location} onChange={(e) => updateValue("location", e.target.value)} className={inputClasses} placeholder="Onde você atende?" /></label>
                    <label className="text-sm font-medium text-zinc-300">Instagram ou site<input required value={values.profile} onChange={(e) => updateValue("profile", e.target.value)} className={inputClasses} placeholder="@perfil ou seusite.com.br" /></label>
                  </div>
                  <fieldset className="mt-6"><legend className="text-sm font-medium text-zinc-300">Situação atual dos anúncios</legend><div className="mt-3 flex flex-wrap gap-2">{advertisingOptions.map((option) => <Choice key={option} name="advertising" value={option} checked={values.advertising === option} onChange={() => updateValue("advertising", option)} />)}</div></fieldset>
                  <StepActions onBack={goBack} />
                </form>
              </LeadFormStep>
            ) : step === 2 ? (
              <LeadFormStep key="goals" stepKey="goals" direction={direction}>
                <form onSubmit={handleNext}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-medium text-zinc-300">Serviço de interesse<select required value={values.service} onChange={(e) => updateValue("service", e.target.value)} className={inputClasses}><option value="" className="bg-[#121216]">Selecione</option>{serviceOptions.map((option) => <option key={option} className="bg-[#121216]">{option}</option>)}</select></label>
                    <label className="text-sm font-medium text-zinc-300">Melhor horário<input required value={values.bestTime} onChange={(e) => updateValue("bestTime", e.target.value)} className={inputClasses} placeholder="Ex.: após as 14h" /></label>
                  </div>
                  <fieldset className="mt-6"><legend className="text-sm font-medium text-zinc-300">Principal objetivo</legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{objectiveOptions.map((option) => <Choice key={option} name="objective" value={option} checked={values.objective === option} onChange={() => updateValue("objective", option)} />)}</div></fieldset>
                  <StepActions onBack={goBack} />
                </form>
              </LeadFormStep>
            ) : (
              <LeadFormStep key="review" stepKey="review" direction={direction}>
                <label className="block text-sm font-medium text-zinc-300">Observações <span className="font-normal text-zinc-600">(opcional)</span><textarea value={values.notes} onChange={(e) => updateValue("notes", e.target.value)} className={`${inputClasses} min-h-24 resize-y`} placeholder="Conte algo que ajude na análise." /></label>
                <div className="rounded-[1.4rem] border border-[rgba(245,169,0,0.22)] bg-[rgba(245,169,0,0.06)] p-5 sm:p-6">
                  <CheckCircle2 className="h-8 w-8 text-[var(--color-gold-light)]" aria-hidden="true" />
                  <h3 className="font-display type-section-subtitle mt-5 text-white">
                    Tudo pronto!
                  </h3>
                  <p className="type-body-md mt-2 text-[var(--color-text-muted)]">
                    Agora vamos abrir o WhatsApp com suas respostas. Nenhuma informação foi enviada ainda.
                  </p>
                </div>

                <dl className="mt-5 grid gap-3 rounded-[1.4rem] border border-white/8 bg-white/[0.025] p-5 text-sm sm:grid-cols-2 sm:p-6">
                  {[
                    ["Nome", values.name],
                    ["Empresa", values.company],
                    ["Serviço", values.service],
                    ["Objetivo", values.objective],
                    ["Região", values.location],
                    ["Contato", values.bestTime],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-zinc-500">{label}</dt>
                      <dd className="mt-1 font-medium text-white">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 px-6 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/5"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Editar respostas
                  </button>
                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-deep)] px-6 text-sm font-semibold text-black"
                  >
                    Enviar respostas pelo WhatsApp
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </motion.a>
                </div>
              </LeadFormStep>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Choice({ name, value, checked, onChange }: { name: string; value: string; checked: boolean; onChange: () => void }) {
  return <label className="cursor-pointer"><input required type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" /><span className="flex min-h-11 items-center rounded-xl border border-white/10 px-4 text-sm text-zinc-400 transition peer-checked:scale-[1.01] peer-checked:border-[var(--color-gold)] peer-checked:bg-[rgba(245,169,0,0.08)] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--color-gold-light)]">{checked ? "✓ " : ""}{value}</span></label>;
}

function StepActions({ onBack }: { onBack?: () => void }) {
  return <div className="mt-7 flex items-center justify-between gap-3">{onBack ? <button type="button" onClick={onBack} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 px-5 text-sm font-semibold text-white"><ArrowLeft className="h-4 w-4" /> Voltar</button> : <span />}<motion.button type="submit" whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-deep)] px-6 text-sm font-semibold text-black">Continuar <ArrowRight className="h-4 w-4" /></motion.button></div>;
}
