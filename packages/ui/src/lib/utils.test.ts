import { expect, test } from "vitest";

import { formatDate } from "./utils";

test("format string to date", () => {
  expect(formatDate("Wed Sep 06 2023 16:46:54")).toBe("September 6, 2023");
});
