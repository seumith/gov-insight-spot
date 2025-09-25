import { useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useSchemesStore } from "@/contexts/SchemesContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const emptyForm = {
  id: "",
  title: "",
  description: "",
  fullDescription: "",
  category: "",
  validity: "Ongoing (No End Date)",
  criteria: [] as string[],
  benefitAmount: "",
  beneficiaries: "",
  applicationDeadline: "",
  documentsRequired: [] as string[],
  applicationProcess: [] as string[],
  eligibility: [] as string[],
  contactInfo: { phone: "", email: "", website: "" },
};

const Admin = () => {
  const { isAdmin } = useAuth();
  const { schemes, createScheme, deleteScheme, updateScheme } = useSchemesStore();
  const [form, setForm] = useState({ ...emptyForm });
  const [isEditingId, setIsEditingId] = useState<string | null>(null);

  if (!isAdmin) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-semibold">Access Denied</h1>
          <p className="text-muted-foreground mt-2">Admin privileges required.</p>
        </div>
      </div>
    );
  }

  const handlePublish = () => {
    if (!form.id || !form.title) return;
    const scheme = { ...form } as any;
    if (isEditingId) {
      updateScheme(isEditingId, scheme);
      setIsEditingId(null);
    } else {
      createScheme(scheme);
    }
    setForm({ ...emptyForm });
  };

  const startEdit = (id: string) => {
    const s = schemes.find(x => x.id === id);
    if (!s) return;
    setIsEditingId(id);
    setForm({
      id: s.id,
      title: s.title,
      description: s.description,
      fullDescription: s.fullDescription,
      category: s.category,
      validity: s.validity,
      criteria: [...s.criteria],
      benefitAmount: s.benefitAmount,
      beneficiaries: s.beneficiaries,
      applicationDeadline: s.applicationDeadline,
      documentsRequired: [...s.documentsRequired],
      applicationProcess: [...s.applicationProcess],
      eligibility: [...s.eligibility],
      contactInfo: { ...s.contactInfo },
    });
  };

  const onArrayChange = (key: keyof typeof emptyForm, value: string) => {
    const items = value.split("\n").map(v => v.trim()).filter(Boolean);
    setForm(prev => ({ ...prev, [key]: items }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{isEditingId ? "Edit Scheme" : "Create Scheme"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="ID (slug) e.g. my-scheme-id" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} />
              <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              <Input placeholder="Benefit Amount" value={form.benefitAmount} onChange={(e) => setForm({ ...form, benefitAmount: e.target.value })} />
              <Input placeholder="Beneficiaries" value={form.beneficiaries} onChange={(e) => setForm({ ...form, beneficiaries: e.target.value })} />
              <Input placeholder="Application Deadline" value={form.applicationDeadline} onChange={(e) => setForm({ ...form, applicationDeadline: e.target.value })} />
              <Textarea placeholder="Short Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <Textarea placeholder="Full Description" value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} />
              <Textarea placeholder="Eligibility (one per line)" value={form.eligibility.join("\n")} onChange={(e) => onArrayChange("eligibility", e.target.value)} />
              <Textarea placeholder="Criteria (one per line)" value={form.criteria.join("\n")} onChange={(e) => onArrayChange("criteria", e.target.value)} />
              <Textarea placeholder="Documents Required (one per line)" value={form.documentsRequired.join("\n")} onChange={(e) => onArrayChange("documentsRequired", e.target.value)} />
              <Textarea placeholder="Application Process (one per line)" value={form.applicationProcess.join("\n")} onChange={(e) => onArrayChange("applicationProcess", e.target.value)} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Input placeholder="Phone" value={form.contactInfo.phone} onChange={(e) => setForm({ ...form, contactInfo: { ...form.contactInfo, phone: e.target.value } })} />
                <Input placeholder="Email" value={form.contactInfo.email} onChange={(e) => setForm({ ...form, contactInfo: { ...form.contactInfo, email: e.target.value } })} />
                <Input placeholder="Website" value={form.contactInfo.website} onChange={(e) => setForm({ ...form, contactInfo: { ...form.contactInfo, website: e.target.value } })} />
              </div>
              <div className="flex gap-3">
                <Button onClick={handlePublish}>{isEditingId ? "Update" : "Publish"}</Button>
                {isEditingId && (
                  <Button variant="outline" onClick={() => { setIsEditingId(null); setForm({ ...emptyForm }); }}>Cancel</Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schemes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {schemes.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded border border-border">
                    <div>
                      <div className="font-medium">{s.title}</div>
                      <div className="text-xs text-muted-foreground">{s.category}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEdit(s.id)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteScheme(s.id)}>Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
