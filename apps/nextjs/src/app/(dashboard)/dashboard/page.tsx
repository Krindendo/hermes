import { dashboardColumns as columns } from "~/components/dashboard-columns";
import { DashboardDataTable } from "~/components/dashboard-data-table";

export default function DashboardPage() {
  const files = MockFiles;
  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Files <span>({files.length})</span>
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your files!
          </p>
        </div>
      </div>
      <DashboardDataTable data={files} columns={columns} />
    </div>
  );
}

const MockFiles = [
  {
    id: "File-8782",
    name: "KgVUrEIFRP",
    extension: ".zip",
    size: "3246 kb",
  },
  {
    id: "File-7543",
    name: "gYOXUpZrbz",
    extension: ".zip",
    size: "1246 kb",
  },
  {
    id: "File-7548",
    name: "XkikJGJqIz",
    extension: ".txt",
    size: "45 kb",
  },
];
