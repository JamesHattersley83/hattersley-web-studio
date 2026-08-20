import { getInvoices, getProjects } from "@/lib/queries";
import { effectiveInvoiceStatus } from "@/lib/derive";
import { formatCurrency } from "@/lib/format";
import { PageHeader, StatCard } from "@/components/ui";
import { InvoicesView } from "@/components/InvoicesView";
import { NewInvoiceButton } from "@/components/forms/InvoiceForm";
import { AlertTriangleIcon, InvoiceIcon, PoundIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function InvoicesPage() {
  const [invoices, projects] = await Promise.all([getInvoices(), getProjects()]);

  const clientName: Record<string, string> = {};
  for (const p of projects) clientName[p.id] = p.client_name;

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const withEff = invoices.map((i) => ({ i, eff: effectiveInvoiceStatus(i) }));

  const outstanding = withEff
    .filter(({ eff }) => eff === "sent" || eff === "overdue")
    .reduce((s, { i }) => s + i.amount, 0);

  const paidThisMonth = invoices
    .filter(
      (i) =>
        i.status === "paid" &&
        i.paid_date &&
        new Date(i.paid_date + "T00:00:00") >= monthStart,
    )
    .reduce((s, i) => s + i.amount, 0);

  const draftCount = withEff.filter(({ eff }) => eff === "draft").length;
  const overdue = withEff.filter(({ eff }) => eff === "overdue");
  const overdueTotal = overdue.reduce((s, { i }) => s + i.amount, 0);

  return (
    <>
      <PageHeader
        title="Invoices"
        subtitle="Invoices you've raised — payment is collected separately via Monzo."
        action={<NewInvoiceButton projects={projects} />}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Outstanding"
          value={formatCurrency(outstanding)}
          icon={<PoundIcon size={20} />}
          tone="amber"
        />
        <StatCard
          label="Paid This Month"
          value={formatCurrency(paidThisMonth)}
          icon={<InvoiceIcon size={20} />}
          tone="green"
        />
        <StatCard label="Draft" value={draftCount} tone="slate" />
        <StatCard
          label="Overdue"
          value={formatCurrency(overdueTotal)}
          sub={`${overdue.length} invoice${overdue.length === 1 ? "" : "s"}`}
          icon={<AlertTriangleIcon size={20} />}
          tone={overdue.length ? "red" : "slate"}
        />
      </div>

      <InvoicesView invoices={invoices} clientName={clientName} />
    </>
  );
}
