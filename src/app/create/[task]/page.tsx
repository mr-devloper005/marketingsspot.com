"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Save, Sparkles, ShieldCheck, Building2 } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import { CATEGORY_OPTIONS } from "@/lib/categories";
import { SITE_CONFIG, type TaskKey } from "@/lib/site-config";
import { addLocalPost } from "@/lib/local-posts";

type Field = {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "url"
    | "number"
    | "tags"
    | "images"
    | "highlights"
    | "category"
    | "file";
  placeholder?: string;
  required?: boolean;
};

const FORM_CONFIG: Record<TaskKey, { title: string; description: string; fields: Field[] }> = {
  listing: {
    title: "Create Business Listing",
    description: "Add a local-only listing with business details.",
    fields: [
      { key: "title", label: "Listing title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Full description", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "logo", label: "Logo URL", type: "url" },
      { key: "images", label: "Gallery images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  classified: {
    title: "Create Classified",
    description: "Add a local-only classified ad.",
    fields: [
      { key: "title", label: "Ad title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Ad details", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "images", label: "Images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  article: {
    title: "Create Article",
    description: "Write a local-only article post.",
    fields: [
      { key: "title", label: "Article title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Article content (HTML allowed)", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  image: {
    title: "Create Image Share",
    description: "Share image-only content locally.",
    fields: [
      { key: "title", label: "Image title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Caption", type: "textarea" },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images", required: true },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  profile: {
    title: "Create Profile",
    description: "Create a local-only business profile.",
    fields: [
      { key: "brandName", label: "Brand name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the brand", type: "textarea" },
      { key: "website", label: "Website URL", type: "url", required: true },
      { key: "logo", label: "Logo URL", type: "url", required: true },
    ],
  },
  social: {
    title: "Create Social Post",
    description: "Publish a local-only social update.",
    fields: [
      { key: "title", label: "Post title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Post content", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  sbm: {
    title: "Create Bookmark",
    description: "Submit a local-only social bookmark.",
    fields: [
      { key: "title", label: "Bookmark title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Why it’s useful", type: "textarea" },
      { key: "website", label: "Target URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  pdf: {
    title: "Create PDF Entry",
    description: "Add a local-only PDF resource.",
    fields: [
      { key: "title", label: "PDF title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "fileUrl", label: "PDF file URL", type: "file", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover image", type: "images" },
    ],
  },
  org: {
    title: "Create Organization",
    description: "Create a local-only organization profile.",
    fields: [
      { key: "brandName", label: "Organization name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the organization", type: "textarea" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "logo", label: "Logo URL", type: "url" },
    ],
  },
  comment: {
    title: "Create Blog Comment",
    description: "Store a local-only blog comment entry.",
    fields: [
      { key: "title", label: "Comment title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Comment body", type: "textarea", required: true },
      { key: "website", label: "Target post URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
    ],
  },
};

export default function CreateTaskPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const taskKey = params?.task as TaskKey;

  const taskConfig = useMemo(
    () => SITE_CONFIG.tasks.find((task) => task.key === taskKey && task.enabled),
    [taskKey]
  );
  const formConfig = FORM_CONFIG[taskKey];

  const [values, setValues] = useState<Record<string, string>>({});
  const [uploadingPdf, setUploadingPdf] = useState(false);

  if (!taskConfig || !formConfig) {
    return (
      <div className="min-h-screen bg-slate-50">
        <NavbarShell />
        <main className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Task not available</h1>
          <p className="mt-2 text-slate-600">
            This task is not enabled for the current site.
          </p>
          <Button className="mt-6 rounded-full bg-[#4E56C0] hover:bg-[#3f4aa8]" asChild>
            <Link href="/">Back home</Link>
          </Button>
        </main>
      </div>
    );
  }

  const updateValue = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in before creating content.",
      });
      router.push("/login");
      return;
    }

    const missing = formConfig.fields.filter((field) => field.required && !values[field.key]);
    if (missing.length) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields before saving.",
      });
      return;
    }

    const title = values.title || values.brandName || "Untitled";
    const summary = values.summary || "";
    const contentType = taskConfig.contentType || taskKey;

    const content: Record<string, unknown> = {
      type: contentType,
    };

    if (values.category) content.category = values.category;
    if (values.description) content.description = values.description;
    if (values.website) content.website = values.website;
    if (values.email) content.email = values.email;
    if (values.phone) content.phone = values.phone;
    if (values.address) content.address = values.address;
    if (values.location) content.location = values.location;
    if (values.logo) content.logo = values.logo;
    if (values.fileUrl) content.fileUrl = values.fileUrl;
    if (values.brandName) content.brandName = values.brandName;

    const highlights = values.highlights
      ? values.highlights.split(",").map((item) => item.trim()).filter(Boolean)
      : [];
    if (highlights.length) content.highlights = highlights;

    const tags = values.tags
      ? values.tags.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const images = values.images
      ? values.images.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const post = addLocalPost({
      task: taskKey,
      title,
      summary,
      authorName: user.name,
      tags,
      content,
      media: images.map((url) => ({ url, type: "IMAGE" })),
      publishedAt: new Date().toISOString(),
    });

    toast({
      title: "Saved locally",
      description: "This post is stored only in your browser.",
    });

    router.push(`/local/${taskKey}/${post.slug}`);
  };

  const isTextareaField = (key: string) => {
    const f = formConfig.fields.find((x) => x.key === key);
    return f?.type === "textarea";
  };

  const renderField = (field: Field) => (
    <div key={field.key} className={`grid gap-2 ${isTextareaField(field.key) || field.type === "images" || field.type === "highlights" || field.type === "tags" ? "md:col-span-2" : ""}`}>
      <Label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
        {field.label} {field.required ? <span className="text-[#9B5DE0]">*</span> : null}
      </Label>
      {field.type === "textarea" ? (
        <Textarea
          rows={4}
          placeholder={field.placeholder}
          value={values[field.key] || ""}
          onChange={(event) => updateValue(field.key, event.target.value)}
          className="rounded-xl border-slate-200 bg-white focus-visible:border-[#4E56C0] focus-visible:ring-2 focus-visible:ring-[#4E56C0]/20"
        />
      ) : field.type === "category" ? (
        <select
          value={values[field.key] || ""}
          onChange={(event) => updateValue(field.key, event.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 focus-visible:border-[#4E56C0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E56C0]/20"
        >
          <option value="">Select category</option>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.slug} value={option.slug}>
              {option.name}
            </option>
          ))}
        </select>
      ) : field.type === "file" ? (
        <div className="grid gap-3">
          <Input
            type="file"
            accept="application/pdf"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              if (file.type !== "application/pdf") {
                toast({
                  title: "Invalid file",
                  description: "Please upload a PDF file.",
                });
                return;
              }
              const reader = new FileReader();
              setUploadingPdf(true);
              reader.onload = () => {
                const result = typeof reader.result === "string" ? reader.result : "";
                updateValue(field.key, result);
                setUploadingPdf(false);
                toast({
                  title: "PDF uploaded",
                  description: "File is stored locally.",
                });
              };
              reader.readAsDataURL(file);
            }}
            className="rounded-xl border-slate-200 bg-white"
          />
          <Input
            type="text"
            placeholder="Or paste a PDF URL"
            value={values[field.key] || ""}
            onChange={(event) => updateValue(field.key, event.target.value)}
            className="h-11 rounded-xl border-slate-200 bg-white focus-visible:border-[#4E56C0] focus-visible:ring-2 focus-visible:ring-[#4E56C0]/20"
          />
          {uploadingPdf ? (
            <p className="text-xs text-slate-500">Uploading PDF…</p>
          ) : null}
        </div>
      ) : (
        <Input
          type={field.type === "number" ? "number" : "text"}
          placeholder={
            field.type === "images" || field.type === "tags" || field.type === "highlights"
              ? "Separate values with commas"
              : field.placeholder
          }
          value={values[field.key] || ""}
          onChange={(event) => updateValue(field.key, event.target.value)}
          className="h-11 rounded-xl border-slate-200 bg-white focus-visible:border-[#4E56C0] focus-visible:ring-2 focus-visible:ring-[#4E56C0]/20"
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <NavbarShell />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(253,207,250,0.35),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-white backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            {taskConfig.label}
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {formConfig.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/85">
            {formConfig.description} Fill in the details below — everything is saved safely in your browser.
          </p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm text-white/90">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#FDCFFA]" /> Private & local</span>
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#FDCFFA]" /> Publishes instantly</span>
            <span className="flex items-center gap-2"><Building2 className="h-4 w-4 text-[#FDCFFA]" /> Verified category tags</span>
          </div>
        </div>
      </section>

      <main className="relative z-10 mx-auto -mt-10 max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(78,86,192,0.12)] sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-full bg-[#4E56C0]/10 text-[#4E56C0] hover:bg-[#4E56C0]/15">{taskConfig.label}</Badge>
              <Badge variant="outline" className="rounded-full border-[#D78FEE] text-[#9B5DE0]">Local-only</Badge>
            </div>
            <p className="text-xs text-slate-500">
              Fields marked <span className="font-semibold text-[#9B5DE0]">*</span> are required
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {formConfig.fields.map((field) => renderField(field))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-6">
            <Button
              onClick={handleSubmit}
              className="h-12 rounded-full bg-[#4E56C0] px-7 text-sm font-semibold text-white shadow-lg hover:bg-[#3f4aa8]"
            >
              <Save className="mr-2 h-4 w-4" />
              Save locally
            </Button>
            <Button
              variant="outline"
              asChild
              className="h-12 rounded-full border-slate-200 px-6 text-sm font-semibold text-slate-700 hover:border-[#4E56C0] hover:text-[#4E56C0]"
            >
              <Link href={taskConfig.route}>
                View {taskConfig.label}
                <Plus className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <span className="ml-auto text-xs text-slate-500">
              Your draft is stored privately on this device.
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Verified categories", desc: "Pick from curated categories so buyers find you fast.", icon: ShieldCheck },
            { title: "Rich media", desc: "Add gallery images and highlights to stand out.", icon: Sparkles },
            { title: "Instant publish", desc: "Your listing appears the moment you hit save.", icon: Building2 },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4E56C0]/10 text-[#4E56C0]">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-xs leading-5 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
