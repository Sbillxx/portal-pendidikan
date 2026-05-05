const GA_TRACKING_ID = "G-W3G7HCQ6EL";

class Analytics {
  constructor() {
    this.isInitialized = false;
    this.queue = [];
    this.lastTrackedPath = null;
  }

  init() {
    if (typeof window === "undefined") return;

    if (window.gtag) {
      this.isInitialized = true;
      this.processQueue();
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };

      window.gtag("js", new Date());
      window.gtag("config", GA_TRACKING_ID, {
        send_page_view: false, // PENTING: Jangan kirim otomatis
        custom_map: {
          custom_title: "page_title",
        },
      });

      this.isInitialized = true;
      this.processQueue();
    };
  }

  processQueue() {
    while (this.queue.length > 0) {
      const event = this.queue.shift();
      this.executeEvent(event);
    }
  }

  executeEvent(event) {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag(event.type, event.name, event.params);
    }
  }

  track(type, name, params = {}) {
    const event = { type, name, params };

    if (this.isInitialized && typeof window !== "undefined" && window.gtag) {
      this.executeEvent(event);
    } else {
      this.queue.push(event);
    }
  }

  pageView(path, title) {
    // Cegah duplicate tracking untuk path yang sama
    if (this.lastTrackedPath === path) {
      console.log(`Analytics: Skipping duplicate page view for ${path}`);
      return;
    }

    console.log(`Analytics: Tracking page view - ${path} | ${title}`);

    const currentUrl = window.location.href;

    // Method 1: Kirim page_view event dengan parameter lengkap
    this.track("event", "page_view", {
      page_title: title || document.title,
      page_location: currentUrl,
      page_path: path,
      custom_title: title || document.title, // Custom dimension untuk title
      send_to: GA_TRACKING_ID,
    });

    // Method 2: Update konfigurasi untuk halaman baru
    this.track("config", GA_TRACKING_ID, {
      page_title: title || document.title,
      page_path: path,
      page_location: currentUrl,
      custom_map: {
        custom_title: "page_title",
      },
    });

    // Method 3: Kirim custom event untuk memastikan title terekam
    this.track("event", "custom_page_view", {
      event_category: "navigation",
      event_label: title || document.title,
      page_title: title || document.title,
      page_path: path,
      send_to: GA_TRACKING_ID,
    });

    this.lastTrackedPath = path;
  }

  event(eventName, parameters = {}) {
    this.track("event", eventName, {
      ...parameters,
      send_to: GA_TRACKING_ID,
    });
  }
}

const analytics = new Analytics();

if (typeof window !== "undefined") {
  analytics.init();
}

export default analytics;

export const useAnalyticsTracker = () => {
  return {
    trackPageView: (path, title) => analytics.pageView(path, title),
    trackEvent: (eventName, params) => analytics.event(eventName, params),
  };
};
