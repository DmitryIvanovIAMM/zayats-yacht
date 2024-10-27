import { render } from "@testing-library/react";
import SectionTitle, {
  SectionTitleProps,
} from "@/components/SectionTitle/SectionTitle";

const setup = async (propsOverride?: Partial<SectionTitleProps>) => {
  const props = {
    title: "Section Name",
    ...propsOverride,
  };
  const container = render(<SectionTitle {...props} />);
  return {
    container,
  };
};

describe("SectionTitle component", () => {
  it("should show section name by default", async () => {
    const { container } = await setup({});

    expect(container.getByText("Section Name")).toBeInTheDocument();
  });

  it("should show received section name", async () => {
    const { container } = await setup({
      title: "Received Section Title",
    });

    expect(container.getByText("Received Section Title")).toBeInTheDocument();
  });
});
