import { getLeads } from "@/lib/queries";
import { PageHeader, StatCard } from "@/components/ui";
import { AddLeadButton } from "@/components/forms/LeadForm";
import { LeadsView } from "@/components/LeadsView";
import { formatCurrency } from "@/lib/format";
import { LeadsIcon, PoundIcon, TargetIcon, TrendingUpIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

const OPEN_STAGES = ["new", "contacted", "proposal_sent", "contract_signed"];

export default async function LeadsPage() {
  const leads = await getLeads();

  const openLeads = leads.filter((l) => OPEN_STAGES.includes(l.stage));
  const pipelineValue = openLeads.reduce((s, l) => s + (l.estimated_value ?? 0), 0);

  const won = leads.filter((l) => l.stage === "won");
  const lost = leads.filter((l) => l.stage === "lost");
  const decided = won.length + lost.length;
  const winRate = decided > 0 ? Math.round((won.length / decided) * 100) : null;

  // Approximate time-to-close: created_at -> updated_at for won leads.
  const closeDays = won
    .map((l) => {
      const start = new Date(l.created_at).getTime();
      const end = new Date(l.updated_at).getTime();
      return (end - start) / 86_400_000;
    })
    .filter((d) => d >= 0);
  const avgClose =
    closeDays.length > 0
      ? Math.round(closeDays.reduce((a, b) => a + b, 0) / closeDays.length)
      : null;

  return (
    <>
      <PageHeader
        title="Leads"
        subtitle="Your sales pipeline across both trading names."
        action={<AddLeadButton />}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Open Leads"
          value={openLeads.length}
          icon={<LeadsIcon size={20} />}
          tone="blue"
        />
        <StatCard
          label="Pipeline Value"
          value={formatCurrency(pipelineValue)}
          icon={<PoundIcon size={20} />}
          tone="amber"
        />
        <StatCard
          label="Avg. Time to Close"
          value={avgClose != null ? `${avgClose} days` : "—"}
          sub="First contact → signed"
          icon={<TargetIcon size={20} />}
          tone="slate"
        />
        <StatCard
          label="Win Rate"
          value={winRate != null ? `${winRate}%` : "—"}
          sub={`${won.length} won · ${lost.length} lost`}
          icon={<TrendingUpIcon size={20} />}
          tone="green"
        />
      </div>

      <LeadsView leads={leads} />
    </>
  );
}
