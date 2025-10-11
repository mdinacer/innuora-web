"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { addAdvancedTester } from "@/app/actions/tester-actions";
import { AppLocales } from "@/lib/i18n";
import { advancedTesterSchema } from "@/types/tester-form-data";

type FieldErrors = Partial<Record<string, string>>;

type FormStatus = "idle" | "submitting" | "success" | "error";

type JoinTesterCopy = {
  labels: {
    email: {
      label: string;
      placeholder: string;
      required: string;
    };
    occupation: {
      label: string;
      placeholder: string;
      helpText?: string;
    };
    struggles: {
      label: string;
      placeholder: string;
      helpText?: string;
    };
    coping: {
      label: string;
      placeholder: string;
      helpText?: string;
    };
    source: {
      label: string;
      placeholder: string;
      helpText?: string;
    };
    notes: {
      label: string;
      placeholder: string;
      helpText?: string;
    };
    submitButton: string;
  };
  messages: {
    successTitle: string;
    error: string;
    thankYou: string;
  };
  nextSteps: {
    viewDemo: string;
    browseLibrary: string;
    submitAnother: string;
  };
};

interface JoinTesterFormProps {
  locale: AppLocales;
  copy: JoinTesterCopy;
}

type FormValues = {
  email: string;
  occupation: string;
  struggles: string;
  coping: string;
  source: string;
  notes: string;
};

const INITIAL_VALUES: FormValues = {
  email: "",
  occupation: "",
  struggles: "",
  coping: "",
  source: "",
  notes: "",
};

export default function JoinTesterForm({ locale, copy }: JoinTesterFormProps) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSubmitting = status === "submitting";

  const normalizedValues = useMemo(() => {
    return Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value.trim()]),
    ) as FormValues;
  }, [values]);

  const validate = (): boolean => {
    const result = advancedTesterSchema.safeParse(normalizedValues);
    if (result.success) {
      setFieldErrors({});
      return true;
    }

    const newErrors: FieldErrors = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path[0];
      if (typeof path === "string") {
        newErrors[path] = issue.message;
      }
    });
    setFieldErrors(newErrors);
    return false;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setValues(INITIAL_VALUES);
    setFieldErrors({});
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      setStatus("error");
      setErrorMessage(copy.messages.error);
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const formData = new FormData();
      Object.entries(normalizedValues).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await addAdvancedTester(formData);
      if (result.success) {
        setStatus("success");
        resetForm();
      } else {
        setStatus("error");
        setErrorMessage(result.error || copy.messages.error);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage(copy.messages.error);
    }
  };

  if (status === "success") {
    return (
      <div className="space-y-6 text-center">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-green-800">
          <h2 className="text-xl font-semibold">
            {copy.messages.successTitle}
          </h2>
          <p className="mt-2 text-sm text-green-700">
            {copy.messages.thankYou}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 md:flex-row">
            <Link
              href={`/${locale}/demo`}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90"
            >
              {copy.nextSteps.viewDemo}
            </Link>
            <Link
              href={`/${locale}/content`}
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
            >
              {copy.nextSteps.browseLibrary}
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
        >
          {copy.nextSteps.submitAnother}
        </button>
      </div>
    );
  }

  return (
    <form className="grid gap-8" onSubmit={handleSubmit}>
      <fieldset className="grid gap-6" disabled={isSubmitting}>
        <div className="grid gap-2 text-left">
          <label
            className="text-sm font-semibold text-foreground"
            htmlFor="email"
          >
            {copy.labels.email.label}
            <span className="text-red-500"> *</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={handleChange}
            placeholder={copy.labels.email.placeholder}
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {fieldErrors.email ? (
            <p className="text-sm text-red-500">{fieldErrors.email}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              {copy.labels.email.required}
            </p>
          )}
        </div>

        <div className="grid gap-2 text-left">
          <label
            className="text-sm font-semibold text-foreground"
            htmlFor="occupation"
          >
            {copy.labels.occupation.label}
          </label>
          <input
            id="occupation"
            name="occupation"
            value={values.occupation}
            onChange={handleChange}
            placeholder={copy.labels.occupation.placeholder}
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {copy.labels.occupation.helpText && (
            <p className="text-xs text-muted-foreground">
              {copy.labels.occupation.helpText}
            </p>
          )}
          {fieldErrors.occupation && (
            <p className="text-sm text-red-500">{fieldErrors.occupation}</p>
          )}
        </div>

        <div className="grid gap-2 text-left">
          <label
            className="text-sm font-semibold text-foreground"
            htmlFor="struggles"
          >
            {copy.labels.struggles.label}
          </label>
          <textarea
            id="struggles"
            name="struggles"
            rows={4}
            value={values.struggles}
            onChange={handleChange}
            placeholder={copy.labels.struggles.placeholder}
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {copy.labels.struggles.helpText && (
            <p className="text-xs text-muted-foreground">
              {copy.labels.struggles.helpText}
            </p>
          )}
          {fieldErrors.struggles && (
            <p className="text-sm text-red-500">{fieldErrors.struggles}</p>
          )}
        </div>

        <div className="grid gap-2 text-left">
          <label
            className="text-sm font-semibold text-foreground"
            htmlFor="coping"
          >
            {copy.labels.coping.label}
          </label>
          <textarea
            id="coping"
            name="coping"
            rows={4}
            value={values.coping}
            onChange={handleChange}
            placeholder={copy.labels.coping.placeholder}
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {copy.labels.coping.helpText && (
            <p className="text-xs text-muted-foreground">
              {copy.labels.coping.helpText}
            </p>
          )}
          {fieldErrors.coping && (
            <p className="text-sm text-red-500">{fieldErrors.coping}</p>
          )}
        </div>

        <div className="grid gap-2 text-left">
          <label
            className="text-sm font-semibold text-foreground"
            htmlFor="source"
          >
            {copy.labels.source.label}
          </label>
          <input
            id="source"
            name="source"
            value={values.source}
            onChange={handleChange}
            placeholder={copy.labels.source.placeholder}
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {copy.labels.source.helpText && (
            <p className="text-xs text-muted-foreground">
              {copy.labels.source.helpText}
            </p>
          )}
          {fieldErrors.source && (
            <p className="text-sm text-red-500">{fieldErrors.source}</p>
          )}
        </div>

        <div className="grid gap-2 text-left">
          <label
            className="text-sm font-semibold text-foreground"
            htmlFor="notes"
          >
            {copy.labels.notes.label}
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={values.notes}
            onChange={handleChange}
            placeholder={copy.labels.notes.placeholder}
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {copy.labels.notes.helpText && (
            <p className="text-xs text-muted-foreground">
              {copy.labels.notes.helpText}
            </p>
          )}
          {fieldErrors.notes && (
            <p className="text-sm text-red-500">{fieldErrors.notes}</p>
          )}
        </div>
      </fieldset>

      {status === "error" && errorMessage && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        <span>{copy.labels.submitButton}</span>
      </button>
    </form>
  );
}
