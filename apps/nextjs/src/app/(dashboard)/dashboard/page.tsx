import { dashboardColumns as columns } from "~/components/dashboard-columns";
import { DashboardDataTable } from "~/components/dashboard-data-table";
import { DashboardHeader } from "~/components/dashboard-header";
import { DashboardShell } from "~/components/dashboard-shell";
import { DashboardUploadFileButton } from "~/components/dashboard-upload-file-button";

export default function DashboardPage() {
  const files = MockFiles;

  const title = `Files (${files.length})`;

  return (
    <DashboardShell>
      <DashboardHeader heading={title} text="Here's a list of your files!">
        <DashboardUploadFileButton />
      </DashboardHeader>
      <div>
        <DashboardDataTable data={files} columns={columns} />
      </div>
    </DashboardShell>
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
