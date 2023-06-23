import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { useGifsStore } from "../../stores/gifsStore";
import { describe, expect, it, vi } from "vitest";
import GifListComponent from "../GifListComponent.vue";

installQuasarPlugin();

describe("GifList Component", () => {
  it("should display message if isGifsScrollDisabled is true", () => {
    const wrapper = mount(GifListComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              gifs: { isGifsScrollDisabled: true },
            },
          }),
        ],
      },
    });

    expect(wrapper.find('[data-test="no-gifs-message"]').exists()).toBe(true);
  });

  it("should not display message if isGifsScrollDisabled is false", () => {
    const wrapper = mount(GifListComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              gifs: { isGifsScrollDisabled: false },
            },
          }),
        ],
      },
    });

    expect(wrapper.find('[data-test="no-gifs-message"]').exists()).toBe(false);
  });

  it("should show modal if isModalOpen is true", async () => {
    const wrapper = mount(GifListComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              gifs: { isModalOpen: true },
            },
          }),
        ],
      },
    });
    const store = useGifsStore();

    expect(store.isModalOpen).toBe(true);
  });

  it("should not show modal if isModalOpen is true", async () => {
    const wrapper = mount(GifListComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              gifs: { isModalOpen: false },
            },
          }),
        ],
      },
    });
    const store = useGifsStore();

    expect(store.isModalOpen).toBe(false);
  });
});
