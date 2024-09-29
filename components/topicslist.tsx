import Link from "next/link";
import RemoveBtn from "./removebtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function TopicsList() {
  const { topics } = await getTopics();

  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id}
          className={`p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start ${t.status === 'complete' ? 'bg-gray-200' : ''}`}
        >
          <div>
            <h2 className={`font-bold text-2xl ${t.status === 'complete' ? 'line-through' : ''}`}>
              {t.title}
            </h2>
            <div>{t.description}</div>
            <div>Due: {new Date(t.dueDate).toLocaleDateString()}</div>

            {/* เพิ่มการแสดงสถานะงาน */}
            <div className={`font-semibold mt-2 ${t.status === 'complete' ? 'text-green-600' : 'text-red-600'}`}>
              Status: {t.status === 'complete' ? 'Complete' : 'Incomplete'}
            </div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/edittopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
