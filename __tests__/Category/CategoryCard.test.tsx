import { render, screen } from "@testing-library/react";
import CategoryCard from "@/components/Category/CategoryCard.component";
import { ICategory } from "@/interfaces/Category/ICategory.interface";
import "@testing-library/jest-dom";

describe("CategoryCard", () => {
  const category: ICategory.ICategoryCard = {
    cover: "cover.jpg",
    author: "John Doe",
    name: "Category Name",
    price: "10",
  };

  it("renders correctly", () => {
    render(<CategoryCard {...category} />);

    const nameElement = screen.getAllByText(category.name)[0];
    const authorElement = screen.getAllByText(category.author)[0];
    const priceElement = screen.getAllByText(`${category.price} $`)[0];

    expect(nameElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });

  it("renders with viewAll prop", () => {
    render(<CategoryCard {...category} viewAll />);

    const nameElement = screen.getByText(category.name);
    const authorElement = screen.getByText(category.author);
    const priceElement = screen.getByText(`${category.price} $`);
    const coverImageElement = screen.getByAltText(category.name);

    expect(nameElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(coverImageElement).toBeInTheDocument();
  });
});
