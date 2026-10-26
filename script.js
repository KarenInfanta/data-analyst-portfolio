"use strict";

/* =========================================================
   KAREN INFANTA — PORTFOLIO INTERACTIONS
   Vanilla JavaScript + Chart.js
   ========================================================= */

/*
 * PERSONAL CONFIGURATION
 *
 * Replace the empty values below with your actual details.
 * Do not add placeholder email addresses or profile URLs.
 */
const PORTFOLIO_CONFIG = {
  github: "https://github.com/KarenInfanta",
  linkedin: "",
  email: "",
  resumePath: "assets/resume.pdf"
};

/*
 * ILLUSTRATIVE DATA ONLY
 *
 * These fictional values demonstrate chart functionality.
 * They are not actual company, customer, sales, or healthcare data.
 *
 * Replace them with appropriately sourced data for a real project.
 */
const DEMO_DATA = {
  sales: {
    title: "Monthly sales comparison",
    unit: "illustrative units",
    categories: ["Product A", "Product B"],
    periods: [
      { label: "Jan", values: [42, 28] },
      { label: "Feb", values: [55, 34] },
      { label: "Mar", values: [48, 39] },
      { label: "Apr", values: [68, 45] },
      { label: "May", values: [74, 52] },
      { label: "Jun", values: [81, 61] }
    ]
  },

  visits: {
    title: "Service visits comparison",
    unit: "illustrative visits",
    categories: ["Service A", "Service B"],
    periods: [
      { label: "Jan", values: [120, 85] },
      { label: "Feb", values: [135, 91] },
      { label: "Mar", values: [128, 99] },
      { label: "Apr", values: [150, 110] },
      { label: "May", values: [162, 118] },
      { label: "Jun", values: [175, 126] }
    ]
  }
};

const CHART_COLORS = {
  cyan: "#54e6dc",
  purple: "#a88bff",
  grid: "rgba(153, 174, 210, 0.12)",
  text: "#a3afc6",
  background: ["#54e6dc", "#a88bff"]
};

const state = {
  activeDataset: "sales",
  activePeriod: "all",
  barChart: null,
  doughnutChart: null,
  chartError: false
};

/* ---------------------------------------------------------
   DOM HELPERS
   --------------------------------------------------------- */

function getElement(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  const element = getElement(id);

  if (element) {
    element.textContent = value;
  }
}

function announce(message) {
  setText("chart-status", message);
}

/* ---------------------------------------------------------
   MOBILE NAVIGATION
   --------------------------------------------------------- */

function initializeNavigation() {
  const toggle = getElement("menu-toggle");
  const navigation = getElement("primary-navigation");

  if (!toggle || !navigation) {
    return;
  }

  const navigationLinks = navigation.querySelectorAll("a");

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");
    navigation.classList.add("open");
    document.body.classList.add("menu-open");
  }

  toggle.addEventListener("click", function () {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navigationLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();

      if (toggle.getAttribute("aria-expanded") === "false") {
        toggle.focus();
      }
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

/* ---------------------------------------------------------
   PROJECT FILTERS
   --------------------------------------------------------- */

function initializeProjectFilters() {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll(".project-card");
  const projectCount = getElement("project-count");
  const emptyMessage = getElement("empty-projects");

  if (!filterButtons.length || !projectCards.length) {
    return;
  }

  function applyFilter(category) {
    let visibleCount = 0;

    projectCards.forEach(function (card) {
      const matches =
        category === "all" ||
        card.dataset.category === category;

      card.hidden = !matches;

      if (matches) {
        visibleCount += 1;
      }
    });

    filterButtons.forEach(function (button) {
      const isActive = button.dataset.filter === category;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (projectCount) {
      projectCount.textContent =
        visibleCount + (visibleCount === 1
          ? " project template"
          : " project templates");
    }

    if (emptyMessage) {
      emptyMessage.hidden = visibleCount !== 0;
    }
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyFilter(button.dataset.filter);
    });
  });

  applyFilter("all");
}

/* ---------------------------------------------------------
   ANALYTICS DATA FILTERING
   --------------------------------------------------------- */

function getFilteredPeriods() {
  const dataset = DEMO_DATA[state.activeDataset];

  if (!dataset) {
    return [];
  }

  const periods = dataset.periods;

  if (state.activePeriod === "first") {
    return periods.slice(0, 3);
  }

  if (state.activePeriod === "last") {
    return periods.slice(-3);
  }

  return periods.slice();
}

/* ---------------------------------------------------------
   CHART.JS CONFIGURATION
   --------------------------------------------------------- */

function getCommonChartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,

    animation: {
      duration: 350
    },

    plugins: {
      legend: {
        labels: {
          color: CHART_COLORS.text,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 18,
          font: {
            family: "DM Sans",
            size: 11
          }
        }
      },

      tooltip: {
        backgroundColor: "#101a2e",
        titleColor: "#f3f6ff",
        bodyColor: "#c6d3e8",
        borderColor: "#33435f",
        borderWidth: 1,
        padding: 12,
        displayColors: true
      }
    }
  };
}

function destroyExistingCharts() {
  if (state.barChart) {
    state.barChart.destroy();
    state.barChart = null;
  }

  if (state.doughnutChart) {
    state.doughnutChart.destroy();
    state.doughnutChart = null;
  }
}

/* ---------------------------------------------------------
   ACCESSIBLE DATA TABLE
   --------------------------------------------------------- */

function renderDataTable(dataset, periods) {
  const tableBody = getElement("analytics-table-body");

  if (!tableBody) {
    return;
  }

  tableBody.replaceChildren();

  setText("table-category-one", dataset.categories[0]);
  setText("table-category-two", dataset.categories[1]);

  const caption = getElement("data-table-caption");

  if (caption) {
    caption.textContent =
      "Illustrative " + dataset.unit +
      " for " + dataset.title + ".";
  }

  if (!periods.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 4;
    cell.textContent = "No data is available for this selection.";

    row.appendChild(cell);
    tableBody.appendChild(row);

    return;
  }

  periods.forEach(function (period) {
    const row = document.createElement("tr");

    const labelCell = document.createElement("th");
    labelCell.scope = "row";
    labelCell.textContent = period.label;

    const firstCell = document.createElement("td");
    firstCell.textContent = period.values[0].toLocaleString();

    const secondCell = document.createElement("td");
    secondCell.textContent = period.values[1].toLocaleString();

    const totalCell = document.createElement("td");
    totalCell.textContent =
      (period.values[0] + period.values[1]).toLocaleString();

    row.append(
      labelCell,
      firstCell,
      secondCell,
      totalCell
    );

    tableBody.appendChild(row);
  });
}

/* ---------------------------------------------------------
   CHART RENDERING
   --------------------------------------------------------- */

function renderAnalytics() {
  if (typeof Chart === "undefined") {
    state.chartError = true;

    announce(
      "Charts could not load. Check your internet connection " +
      "and make sure the Chart.js CDN is accessible."
    );

    setText(
      "bar-chart-footnote",
      "The chart library is unavailable. The interactive charts could not render."
    );

    return;
  }

  const dataset = DEMO_DATA[state.activeDataset];

  if (!dataset) {
    announce("The selected dataset is unavailable.");
    return;
  }

  const periods = getFilteredPeriods();

  const barCanvas = getElement("bar-chart");
  const doughnutCanvas = getElement("doughnut-chart");

  if (!barCanvas || !doughnutCanvas) {
    announce("Chart containers could not be found.");
    return;
  }

  destroyExistingCharts();

  const labels = periods.map(function (period) {
    return period.label;
  });

  const firstValues = periods.map(function (period) {
    return period.values[0];
  });

  const secondValues = periods.map(function (period) {
    return period.values[1];
  });

  setText("bar-chart-title", dataset.title);

  setText(
    "bar-chart-description",
    "Comparison of " + dataset.categories[0] +
    " and " + dataset.categories[1] +
    " using " + dataset.unit + "."
  );

  setText(
    "bar-chart-footnote",
    "All values are illustrative " + dataset.unit +
    ", not real business results."
  );

  setText(
    "doughnut-chart-footnote",
    "Category percentages describe only the displayed illustrative values."
  );

  const commonOptions = getCommonChartOptions();

  state.barChart = new Chart(barCanvas, {
    type: "bar",

    data: {
      labels: labels,

      datasets: [
        {
          label: dataset.categories[0],
          data: firstValues,
          backgroundColor: CHART_COLORS.cyan,
          borderRadius: 5,
          borderSkipped: false,
          maxBarThickness: 32
        },

        {
          label: dataset.categories[1],
          data: secondValues,
          backgroundColor: CHART_COLORS.purple,
          borderRadius: 5,
          borderSkipped: false,
          maxBarThickness: 32
        }
      ]
    },

    options: {
      ...commonOptions,

      interaction: {
        mode: "index",
        intersect: false
      },

      scales: {
        x: {
          grid: {
            display: false
          },

          ticks: {
            color: CHART_COLORS.text,
            font: {
              family: "DM Sans",
              size: 11
            }
          },

          border: {
            color: CHART_COLORS.grid
          }
        },

        y: {
          beginAtZero: true,

          title: {
            display: true,
            text: "Illustrative value",
            color: CHART_COLORS.text,
            font: {
              family: "DM Sans",
              size: 11
            }
          },

          grid: {
            color: CHART_COLORS.grid
          },

          ticks: {
            color: CHART_COLORS.text,
            precision: 0,
            font: {
              family: "DM Sans",
              size: 11
            }
          },

          border: {
            display: false
          }
        }
      }
    }
  });

  const firstTotal = firstValues.reduce(function (sum, value) {
    return sum + value;
  }, 0);

  const secondTotal = secondValues.reduce(function (sum, value) {
    return sum + value;
  }, 0);

  state.doughnutChart = new Chart(doughnutCanvas, {
    type: "doughnut",

    data: {
      labels: dataset.categories,

      datasets: [
        {
          label: "Illustrative category total",

          data: [firstTotal, secondTotal],

          backgroundColor: CHART_COLORS.background,

          borderColor: "#101a2e",

          borderWidth: 4,

          hoverOffset: 8
        }
      ]
    },

    options: {
      ...commonOptions,

      cutout: "70%",

      plugins: {
        ...commonOptions.plugins,

        legend: {
          ...commonOptions.plugins.legend,
          position: "bottom"
        },

        tooltip: {
          ...commonOptions.plugins.tooltip,

          callbacks: {
            label: function (context) {
              const value = Number(context.raw) || 0;
              const total = firstTotal + secondTotal;

              const percentage = total > 0
                ? ((value / total) * 100).toFixed(1)
                : "0.0";

              return (
                " " + context.label +
                ": " + value.toLocaleString() +
                " (" + percentage + "%)"
              );
            }
          }
        }
      }
    }
  });

  renderDataTable(dataset, periods);

  const periodDescription = {
    all: "all six reporting periods",
    first: "the first three reporting periods",
    last: "the last three reporting periods"
  };

  announce(
    "Charts updated for " +
    (dataset.title.toLowerCase()) +
    ", showing " +
    periodDescription[state.activePeriod] +
    ". All values are illustrative."
  );
}

/* ---------------------------------------------------------
   ANALYTICS CONTROLS
   --------------------------------------------------------- */

function initializeAnalytics() {
  const datasetSelect = getElement("dataset-select");
  const periodSelect = getElement("period-select");
  const resetButton = getElement("reset-charts");

  if (!datasetSelect || !periodSelect || !resetButton) {
    return;
  }

  datasetSelect.addEventListener("change", function () {
    state.activeDataset = datasetSelect.value;
    renderAnalytics();
  });

  periodSelect.addEventListener("change", function () {
    state.activePeriod = periodSelect.value;
    renderAnalytics();
  });

  resetButton.addEventListener("click", function () {
    state.activeDataset = "sales";
    state.activePeriod = "all";

    datasetSelect.value = "sales";
    periodSelect.value = "all";

    renderAnalytics();
  });

  renderAnalytics();
}

/* ---------------------------------------------------------
   RESUME AVAILABILITY AND DOWNLOAD
   --------------------------------------------------------- */

async function initializeResume() {
  const button = getElement("resume-button");
  const status = getElement("resume-status");

  if (!button || !status) {
    return;
  }

  const resumePath = PORTFOLIO_CONFIG.resumePath;

  button.href = resumePath;
  button.setAttribute("download", "");

  /*
   * Checking the file over HTTP works when the website is served
   * locally or hosted on GitHub Pages. Browsers may block fetch()
   * for file:// URLs, so use a local HTTP server for testing.
   */
  try {
    const response = await fetch(resumePath, {
      method: "HEAD",
      cache: "no-store"
    });

    if (!response.ok) {
      status.textContent =
        "Resume not added yet. Add your real PDF to assets/resume.pdf.";
    } else {
      status.textContent = "Your resume PDF is available.";
    }
  } catch (error) {
    status.textContent =
      "Resume availability could not be checked. Use a local HTTP server " +
      "or GitHub Pages, and confirm that assets/resume.pdf exists.";
  }

  button.addEventListener("click", async function (event) {
    event.preventDefault();

    status.textContent = "Checking your resume file…";

    try {
      const response = await fetch(resumePath, {
        method: "GET",
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error("Resume file was not found.");
      }

      const blob = await response.blob();

      if (blob.size === 0) {
        throw new Error("Resume file is empty.");
      }

      const objectURL = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");

      downloadLink.href = objectURL;
      downloadLink.download = "Karen_Infanta_Resume.pdf";

      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      window.setTimeout(function () {
        URL.revokeObjectURL(objectURL);
      }, 1000);

      status.textContent = "Your resume download has started.";
    } catch (error) {
      status.textContent =
        "Resume unavailable. Add your actual PDF at assets/resume.pdf " +
        "and try again.";
    }
  });
}

/* ---------------------------------------------------------
   CONFIGURABLE CONTACT LINKS
   --------------------------------------------------------- */

function initializeContactLinks() {
  const linkedinLink = getElement("linkedin-link");
  const linkedinLabel = getElement("linkedin-label");

  const emailLink = getElement("email-link");
  const emailLabel = getElement("email-label");

  const contactStatus = getElement("contact-status");

  const hasLinkedIn =
    typeof PORTFOLIO_CONFIG.linkedin === "string" &&
    /^https:\/\/(www\.)?linkedin\.com\/.+/i.test(
      PORTFOLIO_CONFIG.linkedin.trim()
    );

  const emailValue = PORTFOLIO_CONFIG.email.trim();

  const hasEmail =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

  if (linkedinLink && linkedinLabel) {
    if (hasLinkedIn) {
      linkedinLink.href = PORTFOLIO_CONFIG.linkedin.trim();
      linkedinLink.target = "_blank";
      linkedinLink.rel = "noopener noreferrer";

      linkedinLabel.textContent = "Visit my LinkedIn profile";
    } else {
      linkedinLink.href = "#contact";
      linkedinLabel.textContent = "Add LinkedIn profile";

      linkedinLink.addEventListener("click", function (event) {
        event.preventDefault();

        if (contactStatus) {
          contactStatus.textContent =
            "Add your actual LinkedIn profile URL in script.js.";
        }
      });
    }
  }

  if (emailLink && emailLabel) {
    if (hasEmail) {
      emailLink.href = "mailto:" + emailValue;
      emailLabel.textContent = emailValue;
    } else {
      emailLink.href = "#contact";
      emailLabel.textContent = "Add email address";

      emailLink.addEventListener("click", function (event) {
        event.preventDefault();

        if (contactStatus) {
          contactStatus.textContent =
            "Add your actual email address in script.js.";
        }
      });
    }
  }

  if (contactStatus) {
    if (hasLinkedIn && hasEmail) {
      contactStatus.textContent =
        "LinkedIn and email contact links are configured.";
    } else {
      contactStatus.textContent =
        "Update the LinkedIn and email values in script.js before publishing.";
    }
  }
}

/* ---------------------------------------------------------
   FOOTER
   --------------------------------------------------------- */

function initializeFooter() {
  setText("current-year", String(new Date().getFullYear()));
}

/* ---------------------------------------------------------
   INITIALIZE THE WEBSITE
   --------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  initializeProjectFilters();
  initializeAnalytics();
  initializeResume();
  initializeContactLinks();
  initializeFooter();
});
