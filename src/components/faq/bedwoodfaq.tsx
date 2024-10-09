import React from 'react';
import { FAQ } from './faq';


export const BedwoodFaq: React.FC = () => {
    const data = {
        title: "Buy Furniture Online at BedWood Furnishing - India's One-Stop Solution for All Your Needs",
        intro: "A home is the most relaxing place in our life, and the furniture brings comfort to our home. Whether you want to furnish your new home or give your existing decor a new makeover, BedWood Furnishing offers a wide range of stylish and functional furniture that caters to every taste and preference.",
        description: [
          "Whether you want to furnish your new home or give your existing decor a new makeover, get every type of wooden furniture online in India that perfectly blends with your home decor with BedWood Furnishing. From traditional designs to contemporary styles, we have something for everyone.",
          "At BedWood Furnishing, we provide a vast collection of ready-made and customized solid wood furniture online. Our customizable options allow you to design furniture that fits your space and style perfectly, ensuring you get exactly what you envision for your home.",
          "You can also explore our exclusive home decor range, including wall art, photo frames, indoor plants, tableware, glassware, kitchen organizers, and many more. Each piece is thoughtfully curated to complement our furniture and enhance the overall aesthetic of your home.",
          "Whether classy or minimalist, we offer you a massive variety of online furniture. Our extensive catalog features everything from sofas and dining tables to beds and wardrobes, all crafted to meet your needs and preferences.",
          "Our various designs, dimensions, colors, and finish options make us one of India's best online furniture sites. Whether you have a small apartment or a large house, we have furniture solutions that can adapt to your space.",
          "Our craftsmen know your home furniture preference; thus, our website curates furniture of different sizes, whether space-saving or huge. Take a pick from our exquisite collection of home furniture online or get it customized as per your requirements; everything is possible at BedWood Furnishing."
        ],
        materialsTitle: "Check out Various Furniture Materials Available at BedWood Furnishing",
        materials: [
          { name: "Sheesham Wood", description: "Sheesham is a type of Indian rosewood that is a trendy pick for home furniture. It's known for its durability, natural beauty, and resistance to decay, making it ideal for long-lasting furniture." },
          { name: "Mango Wood", description: "Mango wood is another popular choice for furniture in India. It's eco-friendly, sustainable, and features beautiful grain patterns, offering a unique aesthetic to every piece." },
          { name: "Teak Wood", description: "Teak is the most popular type of wood for furniture in India. Renowned for its strength and weather resistance, teak wood is perfect for both indoor and outdoor furniture, ensuring longevity and elegance." },
          { name: "Engineered Wood", description: "If you enjoy the sleekness that comes with simplicity, engineered wood will be the right choice. It's manufactured to be durable, versatile, and often more cost-effective than solid wood." },
        ],
        furnitureTitle: "Select from the Wide Range of Furniture Online at BedWood Furnishing",
        furniture: [
          { name: "Living Room", description: "The Living Room is the heart of our home, where families gather to relax and socialize. Our collection includes sofas, coffee tables, and entertainment units designed for comfort and style." },
          { name: "Bedroom", description: "Everyone needs a comfortable bedroom to unwind after a long day. Our bedroom furniture features elegant beds, wardrobes, and bedside tables that enhance your relaxation space." },
          { name: "Dining Room", description: "A happy meal time can be relished in the dining area of the house. Our dining tables and chairs are designed for both functionality and aesthetic appeal, perfect for family dinners or entertaining guests." },
          { name: "Study Room", description: "An exclusive range of study room furniture is available at BedWood Furnishing. From desks to bookshelves, our furniture promotes productivity while adding style to your workspace." },
          { name: "Kids Room", description: "Even your kid's room must be well-decorated. We offer colorful and playful furniture options that are safe and durable, perfect for growing children." },
          { name: "Office Furniture", description: "Every piece of furniture is versatile enough to be used anywhere around your house as you like. Our office furniture combines functionality with modern design, ensuring a productive environment." },
          { name: "Outdoor Furniture", description: "Not just your home, but your patios and gardens need furniture, too. Our outdoor collection includes stylish and weather-resistant pieces that allow you to enjoy your outdoor spaces." },
        ],
        productsTitle: "Explore Different Products at BedWood Furnishing for Your Home Haven",
        careTitle: "How to Care and Clean Your Furniture to Make It Last Long?",
        careDescription: "To maintain the beauty and longevity of your furniture, regularly dust it with a soft cloth, avoid exposing it to direct sunlight, and clean spills immediately with a damp cloth. For wood furniture, consider applying a protective polish every few months.",
        qualityTitle: "Why Investing in High-Quality Furniture Matters?",
        qualityDescription: "Investing in high-quality furniture is essential as it not only enhances the aesthetic appeal of your home but also ensures durability and longevity. High-quality materials and craftsmanship mean that your furniture will withstand everyday use, providing comfort and style for years to come."
      };
      

  return <FAQ {...data} />;
};


