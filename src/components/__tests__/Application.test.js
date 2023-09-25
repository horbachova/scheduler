import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, queryByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);



describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    // Render component and wait for data to load
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

        fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    
    const { container } = render(<Application/>);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

        fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    // Validation
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );
  });
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application/>);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(appointment => 
        queryByText(appointment, "Archie Cohen")
      );

        fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, /Are you sure/i)).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, ("Deleting"))).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // Render component and wait for data to load
    const { container } = render(<Application/>);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(appointment => 
        queryByText(appointment, "Archie Cohen")
      );

    // Edit the interview
    fireEvent.click(getByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Berk Ozer" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    //Validate
    expect(getByText(appointment, ("Saving"))).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Berk Ozer"));
    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();
  
  });
})