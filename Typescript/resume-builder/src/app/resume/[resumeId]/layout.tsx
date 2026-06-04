export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* <ResumeSidebar /> */}

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
