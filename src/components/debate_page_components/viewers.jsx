import { Link } from "react-router-dom";

const Viewers = () => {
// Placeholder data for viewers, these are manually placed entries representing real users present in the database.
// This is used because the site is currently not live and fetching data from an active database.
  const viewers = [
    { id: 1, name: "John356" },
    { id: 2, name: "Alice123" },
    { id: 3, name: "Bob456" },
    { id: 4, name: "EthanC_" },
    { id: 5, name: "PixelPilot" },
    { id: 6, name: "Luna" },
    { id: 7, name: "NeoS" },
    { id: 8, name: "Riley" },
    { id: 9, name: "GhostFrame" },
    { id: 10, name: "AvaScript" },
    { id: 11, name: "Zenix404" },
    { id: 12, name: "KaiDreamer" },
    { id: 13, name: "CyberDove" },
    { id: 14, name: "NovaPulse" },
    { id: 15, name: "LeoByte" },
    { id: 16, name: "Ech0" },
    { id: 17, name: "Harper" }
  ];

  return (
    <div>
      <h3 className="text-lg font-bold Roboto mb-4">Current Viewers</h3>
      <div className="flex flex-wrap gap-4">
        {viewers.map((viewer) => (
          <Link
            key={viewer.id}
            to={`/profile/${viewer.name}`} // the profile link is dynamically created using real viewers placed as placeholders.
            className="w-16 h-16 rounded-2xl bg-[rgba(196,92,102,0.21)] backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl text-white font-bold Roboto text-shadow-sm hover:bg-[rgba(158,92,196,0.4)] cursor-pointer transition-colors"
          >
            {viewer.name[0]}
          </Link>
        ))}
      </div>

      <p className="mt-5 font-bold Roboto">
        Total Viewers: <strong>{viewers.length}</strong>
      </p>
    </div>
  );
};

export default Viewers;