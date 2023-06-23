import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import SearchGifListComponent from "../SearchGifListComponent.vue";

installQuasarPlugin();

describe("GifModal Component", () => {
  it("should show clear input icon when there is text", async () => {
    const wrapper = mount(SearchGifListComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    await wrapper.find('[data-test="search-input"]').setValue("hello!");

    expect(wrapper.find('[data-test="clear-input-icon"]').exists()).toBe(true);
  });
});
