import React from 'react';

// Define the interface for the props
interface BedwoodProps {
  title: string;
  intro: string;
  description: string[];
  materialsTitle: string;
  materials: {
    name: string;
    description: string;
  }[];
  furnitureTitle: string;
  furniture: {
    name: string;
    description: string;
  }[];
  productsTitle: string;
  careTitle: string;
  qualityTitle: string;
}

export const FAQ: React.FC<BedwoodProps> = ({
  title,
  intro,
  description,
  materialsTitle,
  materials,
  furnitureTitle,
  furniture,
  productsTitle,
  careTitle,
  qualityTitle,
}) => {
  return (
    <div>
        <div className="max-w-full mx-auto p-4 md:p-8 font-pangram bg-white"> {/* Apply the font here */}
      <h1 className="text-xl font-semibold mb-4">{title}</h1>
      <p className="text-base font-medium mb-6">{intro}</p>
      {description.map((para, index) => (
        <p className="text-base mb-3" key={index}>
          {para}
        </p>
      ))}

      <h2 className="text-xl font-semibold mt-8 mb-4">{materialsTitle}</h2>
      {materials.map((material, index) => (
        <div key={index} className='px-6'>
          <h3 className="text-base font-semibold mt-4">
            {index + 1}. {material.name}
          </h3>
          <p className="text-base mb-4">{material.description}</p>
        </div>
      ))}

      <h2 className="text-xl font-semibold mt-8 mb-4">{furnitureTitle}</h2>
      {furniture.map((item, index) => (
        <div key={index} className='px-6'>
          <h3 className="text-base font-semibold mt-4">
            {index + 1}. {item.name}
          </h3>
          <p className="text-base mb-4">{item.description}</p>
        </div>
      ))}

      <h2 className="text-xl font-semibold mt-8 mb-4">{productsTitle}</h2>
      <p className="text-base mb-6">
        BedWood Furnishing houses an extensive range of home furniture and furnishings in various designs to meet everyone's taste in home decor.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">{careTitle}</h2>
      <p className="text-base mb-6">
        There are a few key things that you need to consider to keep your home furniture looking its best.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">{qualityTitle}</h2>
      <p className="text-base mb-6">
        When investing in furniture online, it is essential to choose from high-quality options that can make various aspects of your life easier.
      </p>
    </div>
    <hr className="py-4 border-gray-400 mx-auto md:mx-16 lg:py-8" />
    </div>
  );
};
