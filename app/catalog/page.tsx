import React from "react";
import Link from "next/link";

const pdfs = [
  { id: 1, name: "Bed Design", url: "/catalogs/Bed Design.pdf" },
  { id: 2, name: "Bed Side Table", url: "/catalogs/Bed-side-Table.pdf" },
  { id: 3, name: "Bedwood-Design", url: "/catalogs/Bedwood-Design.pdf" },
  { id: 4, name: "Carvin Simple Bed", url: "/catalogs/Carvin-Bed.pdf" },
  { id: 5, name: "Carvin Beds", url: "/catalogs/Carvin-Beds.pdf" },
  {
    id: 6,
    name: "Carvin Dining Table",
    url: "/catalogs/Carvin-Daining-Table.pdf",
  },
  {
    id: 7,
    name: "carving Luxuary Dining Table",
    url: "/catalogs/carving-Luxuary-Dining-Table.pdf",
  },
  { id: 8, name: "Carving sofa", url: "/catalogs/Carving-sofa.pdf" },
  {
    id: 9,
    name: "Carvin Sofa Design",
    url: "/catalogs/Carvin-Sofa-Design.pdf",
  },
  { id: 10, name: "Chair", url: "/catalogs/Chair.pdf" },
  { id: 11, name: "Dining Table", url: "/catalogs/Daining-Table-SS.pdf" },
  {
    id: 12,
    name: "Digital Modern Sofa",
    url: "/catalogs/Digital-Moder-Sofa.pdf",
  },
  { id: 13, name: "Dining Set", url: "/catalogs/DINING-SET.pdf" },
  { id: 14, name: "Dining Table", url: "/catalogs/Dining-table.pdf" },
  { id: 15, name: "Double Bed", url: "/catalogs/Double-Bed.pdf" },
  { id: 16, name: "Dressing Jhula", url: "/catalogs/Dressing_jhula.pdf" },
  { id: 17, name: "L-Size Sofa", url: "/catalogs/L-Sofa.pdf" },
  { id: 18, name: "Luxury Sofa", url: "/catalogs/Luxury-Sofa.pdf" },
  { id: 19, name: "Luxury Sofa Set", url: "/catalogs/Luxury-Sofa-Set.pdf" },
  {
    id: 20,
    name: "Luxury Velvet Sofa",
    url: "/catalogs/Luxury-Velvet-Sofa.pdf",
  },
  {
    id: 21,
    name: "Luxury Wooden Dining Sets",
    url: "/catalogs/LUXURY-Wooden-Daining-sets.pdf",
  },
  {
    id: 22,
    name: "Modern Wooden Chair",
    url: "/catalogs/Modern-wooden-chair.pdf",
  },
  { id: 23, name: "New Bed Design", url: "/catalogs/New-Bed-Design.pdf" },
  { id: 24, name: "Outdoor Furniture", url: "/catalogs/outdoor-furniture.pdf" },
  {
    id: 25,
    name: "Restaurant Chair Table Sofa",
    url: "/catalogs/Restaurant-Chair-Table-Sofa.pdf",
  },
  { id: 26, name: "Rope Outdoor", url: "/catalogs/Rope-Outdoor.pdf" },
  { id: 27, name: "Sofa Cum Bed", url: "/catalogs/Sofa_CumBed.pdf" },
  { id: 28, name: "Sofa Collection", url: "/catalogs/Sofa-Collection.pdf" },
  { id: 29, name: "Sofa Design", url: "/catalogs/Sofa-Design.pdf" },
  { id: 30, name: "VIP Luxury Sofa", url: "/catalogs/VIP-LUXURY-SOFA.pdf" },
  { id: 31, name: "Wooden Chair", url: "/catalogs/Wooden-Chair.pdf" },
];

const PdfGallery: React.FC = () => {
  return (
    <div className="bg-orange-50">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-8 pt-12">
          Catalog's Gallery
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {pdfs.map((pdf) => (
            <div
              key={pdf.id}
              className="border rounded-lg p-4 text-center shadow bg-white flex flex-col justify-between"
            >
              {/* PDF Icon */}
              <Link href={pdf.url} target="_blank" rel="noopener noreferrer">
                <img
                  src="/catalogs/pdf.svg"
                  className="w-full h-32 object-contain mb-2"
                />
              </Link>

              {/* PDF Name */}
              <h2 className="font-semibold mt-2 text-sm">{pdf.name}</h2>

              <div className="group relative mt-4 flex justify-center items-center">
                {/* Download button */}
                <Link
                  href={pdf.url}
                  download
                  className="bg-white w-10 h-10 border flex justify-center items-center rounded-lg hover:text-orange-500 hover:translate-y-1 hover:duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PdfGallery;
