import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SimpleButton } from "./SimpleButton";

it("ボタンをクリックするとON/OFFが切り替わる", async () => {
  const user = userEvent.setup();
  render(<SimpleButton />);
  const simpleButton = screen.getByRole("button");
  expect(simpleButton).toHaveTextContent("OFF");
  await user.click(simpleButton);
  expect(simpleButton).toHaveTextContent("ON");
});

it("描画されてすぐはOFFと表示されている", () => {
  const view = render(<SimpleButton />);
  expect(view.container).toMatchSnapshot();
})