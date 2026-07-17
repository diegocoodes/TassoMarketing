"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Send,
  X,
} from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { LeadFormStep } from "@/components/intro/LeadFormStep";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getWhatsAppUrl } from "@/config/site";
import {
  advertisingOptions,
  objectiveOptions,
  serviceOptions,
} from "@/data/leadFormOptions";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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

type ChoiceError = "advertising" | "objective" | null;

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

const stepTitles = [
  "Sobre o negócio",
  "Presença atual",
  "Objetivos",
  "Revise e envie",
] as const;

const inputClasses =
  "mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-white/20 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[rgba(245,169,0,0.12)] motion-reduce:transition-none";

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
  const [choiceError, setChoiceError] = useState<ChoiceError>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const reducedMotion = useReducedMotion();

  function updateValue(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));

    if (field === choiceError) {
      setChoiceError(null);
    }
  }

  function handleNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    const missingChoice =
      step === 1 && !values.advertising
        ? "advertising"
        : step === 2 && !values.objective
          ? "objective"
          : null;

    if (missingChoice) {
      setChoiceError(missingChoice);
      requestAnimationFrame(() => {
        document.getElementById(`lead-${missingChoice}-0`)?.focus();
      });
      return;
    }

    setChoiceError(null);
    setDirection(1);
    setStep((current) => Math.min(current + 1, 3));
  }

  function goBack() {
    setChoiceError(null);
    setDirection(-1);
    setStep((current) => Math.max(current - 1, 0));
  }

  const whatsappUrl = getWhatsAppUrl(buildLeadMessage(values));

  return (
    <Dialog
      open
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent
        asChild
        showCloseButton={false}
        overlayClassName="z-[120] bg-black/80 backdrop-blur-md"
        className="safe-bottom fixed inset-x-0 bottom-0 left-0 top-auto z-[121] max-h-[calc(100svh-0.5rem)] w-full max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-none rounded-t-[1.75rem] border border-white/10 bg-[#0d0d10] p-0 shadow-[0_-24px_80px_rgba(0,0,0,0.45)] sm:inset-0 sm:m-auto sm:h-fit sm:max-h-[92svh] sm:max-w-3xl sm:rounded-[1.75rem]"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          firstFieldRef.current?.focus();
        }}
      >
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 28, scale: 0.985 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            reducedMotion
              ? undefined
              : { opacity: 0, y: 20, scale: 0.99 }
          }
          transition={{
            duration: reducedMotion ? 0 : 0.25,
            ease: "easeOut",
          }}
        >
          <div
            aria-hidden="true"
            className="mx-auto mt-2 h-1 w-12 rounded-full bg-white/15 sm:hidden"
          />

          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/8 bg-[rgba(13,13,16,0.94)] px-5 py-4 backdrop-blur-lg sm:px-7">
            <div>
              <p className="type-caption text-[var(--color-gold-light)]">
                Etapa {String(step + 1).padStart(2, "0")} de 04
              </p>
              <DialogTitle className="font-display type-section-subtitle mt-1 text-white">
                {stepTitles[step]}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Formulário de contato em quatro etapas. Os campos marcados são
                obrigatórios.
              </DialogDescription>
            </div>

            <DialogClose asChild>
              <button
                type="button"
                aria-label="Fechar formulário"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-white/20 hover:text-white motion-reduce:transition-none"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </DialogClose>
          </header>

          <Progress
            value={(step + 1) * 25}
            aria-label="Progresso do formulário"
            aria-valuetext={`Etapa ${step + 1} de 4`}
            className="h-1 rounded-none bg-white/5 [&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-[var(--color-gold)] [&_[data-slot=progress-indicator]]:to-[var(--color-gold-light)] motion-reduce:[&_[data-slot=progress-indicator]]:transition-none"
          />

          <div className="p-5 sm:p-7">
            <AnimatePresence mode="wait" initial={false}>
              {step === 0 ? (
                <LeadFormStep
                  key="business"
                  stepKey="business"
                  direction={direction}
                >
                  <form onSubmit={handleNext}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="lead-name">Nome</FieldLabel>
                        <input
                          ref={firstFieldRef}
                          id="lead-name"
                          required
                          autoComplete="name"
                          value={values.name}
                          onChange={(event) =>
                            updateValue("name", event.target.value)
                          }
                          className={inputClasses}
                          placeholder="Seu nome"
                        />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="lead-company">
                          Nome da empresa
                        </FieldLabel>
                        <input
                          id="lead-company"
                          required
                          autoComplete="organization"
                          value={values.company}
                          onChange={(event) =>
                            updateValue("company", event.target.value)
                          }
                          className={inputClasses}
                          placeholder="Sua empresa"
                        />
                      </Field>

                      <Field className="sm:col-span-2">
                        <FieldLabel htmlFor="lead-segment">
                          Segmento do negócio
                        </FieldLabel>
                        <input
                          id="lead-segment"
                          required
                          value={values.segment}
                          onChange={(event) =>
                            updateValue("segment", event.target.value)
                          }
                          className={inputClasses}
                          placeholder="Ex.: clínica, varejo, serviços"
                        />
                      </Field>
                    </div>

                    <StepActions />
                  </form>
                </LeadFormStep>
              ) : step === 1 ? (
                <LeadFormStep
                  key="presence"
                  stepKey="presence"
                  direction={direction}
                >
                  <form onSubmit={handleNext}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="lead-location">
                          Cidade ou região
                        </FieldLabel>
                        <input
                          id="lead-location"
                          required
                          autoComplete="address-level2"
                          value={values.location}
                          onChange={(event) =>
                            updateValue("location", event.target.value)
                          }
                          className={inputClasses}
                          placeholder="Onde você atende?"
                        />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="lead-profile">
                          Instagram ou site
                        </FieldLabel>
                        <input
                          id="lead-profile"
                          required
                          value={values.profile}
                          onChange={(event) =>
                            updateValue("profile", event.target.value)
                          }
                          className={inputClasses}
                          placeholder="@perfil ou seusite.com.br"
                        />
                      </Field>
                    </div>

                    <FieldSet
                      className="mt-6"
                      aria-describedby={
                        choiceError === "advertising"
                          ? "lead-advertising-error"
                          : undefined
                      }
                    >
                      <FieldLegend id="lead-advertising-label">
                        Situação atual dos anúncios
                      </FieldLegend>
                      <RadioGroup
                        name="advertising"
                        value={values.advertising}
                        onValueChange={(value) =>
                          updateValue("advertising", value)
                        }
                        aria-labelledby="lead-advertising-label"
                        aria-required="true"
                        aria-invalid={choiceError === "advertising"}
                        className="mt-3 grid gap-2 sm:grid-cols-3"
                      >
                        {advertisingOptions.map((option, index) => (
                          <Choice
                            key={option}
                            id={`lead-advertising-${index}`}
                            value={option}
                            checked={values.advertising === option}
                          />
                        ))}
                      </RadioGroup>
                      {choiceError === "advertising" ? (
                        <FieldDescription
                          id="lead-advertising-error"
                          role="alert"
                          className="mt-2 text-red-300"
                        >
                          Selecione a situação atual dos anúncios.
                        </FieldDescription>
                      ) : null}
                    </FieldSet>

                    <StepActions onBack={goBack} />
                  </form>
                </LeadFormStep>
              ) : step === 2 ? (
                <LeadFormStep
                  key="goals"
                  stepKey="goals"
                  direction={direction}
                >
                  <form onSubmit={handleNext}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="lead-service">
                          Serviço de interesse
                        </FieldLabel>
                        <select
                          id="lead-service"
                          required
                          value={values.service}
                          onChange={(event) =>
                            updateValue("service", event.target.value)
                          }
                          className={inputClasses}
                        >
                          <option value="" className="bg-[#121216]">
                            Selecione
                          </option>
                          {serviceOptions.map((option) => (
                            <option
                              key={option}
                              value={option}
                              className="bg-[#121216]"
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="lead-best-time">
                          Melhor horário
                        </FieldLabel>
                        <input
                          id="lead-best-time"
                          required
                          value={values.bestTime}
                          onChange={(event) =>
                            updateValue("bestTime", event.target.value)
                          }
                          className={inputClasses}
                          placeholder="Ex.: após as 14h"
                        />
                      </Field>
                    </div>

                    <FieldSet
                      className="mt-6"
                      aria-describedby={
                        choiceError === "objective"
                          ? "lead-objective-error"
                          : undefined
                      }
                    >
                      <FieldLegend id="lead-objective-label">
                        Principal objetivo
                      </FieldLegend>
                      <RadioGroup
                        name="objective"
                        value={values.objective}
                        onValueChange={(value) =>
                          updateValue("objective", value)
                        }
                        aria-labelledby="lead-objective-label"
                        aria-required="true"
                        aria-invalid={choiceError === "objective"}
                        className="mt-3 grid gap-2 sm:grid-cols-2"
                      >
                        {objectiveOptions.map((option, index) => (
                          <Choice
                            key={option}
                            id={`lead-objective-${index}`}
                            value={option}
                            checked={values.objective === option}
                          />
                        ))}
                      </RadioGroup>
                      {choiceError === "objective" ? (
                        <FieldDescription
                          id="lead-objective-error"
                          role="alert"
                          className="mt-2 text-red-300"
                        >
                          Selecione o principal objetivo.
                        </FieldDescription>
                      ) : null}
                    </FieldSet>

                    <StepActions onBack={goBack} />
                  </form>
                </LeadFormStep>
              ) : (
                <LeadFormStep
                  key="review"
                  stepKey="review"
                  direction={direction}
                >
                  <Field>
                    <FieldLabel htmlFor="lead-notes">
                      Observações{" "}
                      <span className="font-normal text-zinc-600">
                        (opcional)
                      </span>
                    </FieldLabel>
                    <textarea
                      id="lead-notes"
                      value={values.notes}
                      onChange={(event) =>
                        updateValue("notes", event.target.value)
                      }
                      className={`${inputClasses} min-h-24 resize-y`}
                      placeholder="Conte algo que ajude na análise."
                    />
                  </Field>

                  <div className="mt-5 rounded-[1.4rem] border border-[rgba(245,169,0,0.22)] bg-[rgba(245,169,0,0.06)] p-5 sm:p-6">
                    <CheckCircle2
                      className="h-8 w-8 text-[var(--color-gold-light)]"
                      aria-hidden="true"
                    />
                    <h3 className="font-display type-section-subtitle mt-5 text-white">
                      Tudo pronto!
                    </h3>
                    <p className="type-body-md mt-2 text-[var(--color-text-muted)]">
                      Agora vamos abrir o WhatsApp com suas respostas. Nenhuma
                      informação foi enviada ainda.
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
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 px-6 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/5 motion-reduce:transition-none"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      Editar respostas
                    </button>
                    <motion.a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={
                        reducedMotion ? undefined : { y: -2, scale: 1.01 }
                      }
                      whileTap={reducedMotion ? undefined : { scale: 0.99 }}
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
      </DialogContent>
    </Dialog>
  );
}

function Choice({
  id,
  value,
  checked,
}: {
  id: string;
  value: string;
  checked: boolean;
}) {
  return (
    <div>
      <RadioGroupItem
        id={id}
        value={value}
        aria-label={value}
        className="peer sr-only"
      />
      <FieldLabel
        htmlFor={id}
        className="flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/10 px-4 text-zinc-400 transition peer-data-[state=checked]:scale-[1.01] peer-data-[state=checked]:border-[var(--color-gold)] peer-data-[state=checked]:bg-[rgba(245,169,0,0.08)] peer-data-[state=checked]:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-gold-light)] motion-reduce:transform-none motion-reduce:transition-none"
      >
        {checked ? (
          <Check
            className="h-4 w-4 shrink-0 text-[var(--color-gold-light)]"
            aria-hidden="true"
          />
        ) : (
          <span
            className="h-4 w-4 shrink-0 rounded-full border border-white/25"
            aria-hidden="true"
          />
        )}
        <span>{value}</span>
      </FieldLabel>
    </div>
  );
}

function StepActions({ onBack }: { onBack?: () => void }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="mt-7 flex items-center justify-between gap-3">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 px-5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/5 motion-reduce:transition-none"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar
        </button>
      ) : (
        <span />
      )}
      <motion.button
        type="submit"
        whileHover={reducedMotion ? undefined : { y: -2 }}
        whileTap={reducedMotion ? undefined : { scale: 0.99 }}
        className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-deep)] px-6 text-sm font-semibold text-black"
      >
        Continuar
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </motion.button>
    </div>
  );
}
