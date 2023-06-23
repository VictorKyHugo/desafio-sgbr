import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { useGifsStore } from "../../stores/gifsStore";
import { describe, expect, it, vi } from "vitest";
import GifModalComponent from "../GifModalComponent.vue";

installQuasarPlugin();

describe("GifModal Component", () => {
  it("should close modal when background is clicked", async () => {
    const wrapper = mount(GifModalComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              gifs: { isModalOpen: true },
            },
            stubActions: false,
          }),
        ],
      },
    });

    const store = useGifsStore();

    await wrapper.find('[data-test="modal-background"]').trigger("click");

    expect(store.isModalOpen).toBe(false);
  });

  it("should close modal when icon is clicked", async () => {
    const wrapper = mount(GifModalComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              gifs: { isModalOpen: true },
            },
            stubActions: false,
          }),
        ],
      },
    });

    const store = useGifsStore();

    await wrapper.find('[data-test="modal-close"]').trigger("click");

    expect(store.isModalOpen).toBe(false);
  });
});
