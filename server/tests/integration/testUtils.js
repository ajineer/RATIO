import { vi } from "vitest";

export const mockRes = () => {
  const res = { status: null, body: null };

  res.ok = vi.fn().mockImplementation((bool) => {
    res.ok = bool;
    return res;
  });

  res.status = vi.fn().mockImplementation((code) => {
    res.status = code;
    return res;
  });
  res.json = vi.fn().mockImplementation((data) => {
    res.body = data;
    return res;
  });
  res.send = vi.fn().mockImplementation((data) => {
    res.body = data;
    return res;
  });
  res.cookie = vi.fn().mockImplementation((data) => {
    res.cookie = data || undefined;
  });
  return res;
};
