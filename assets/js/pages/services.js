/* ==============================================
   File: pages/services.js
   Project: Zaza Rush Subaru
   Developer: bguvava
   Last Updated: January 30, 2026
   Description: Services page functionality (SVC-001 to SVC-032)
   - Tab navigation with URL deep-linking (SVC-002, SVC-003)
   - Mobile accordion sync (SVC-028)
   - State persistence (SVC-032)
   - AOS refresh on tab change (SVC-029)
   ============================================== */

(function() {
    'use strict';

    // Constants
    const STORAGE_KEY = 'rushsubaru_active_service_tab';
    const DEFAULT_TAB = 'engines';
    const MOBILE_BREAKPOINT = 768;
    const VALID_TABS = ['engines', 'parts', 'breaking', 'trading', 'garage', 'diagnostics'];

    // DOM Elements
    let tabsContainer = null;
    let accordionContainer = null;
    let initialized = false;

    /**
     * Initialize services page functionality
     */
    function init() {
        if (initialized) return;
        
        tabsContainer = document.getElementById('serviceTabs');
        accordionContainer = document.getElementById('serviceAccordion');
        
        // Don't initialize if elements don't exist
        if (!tabsContainer && !accordionContainer) return;
        
        // Set up event listeners
        setupTabListeners();
        setupAccordionListeners();
        setupPopStateListener();
        
        // Activate initial tab
        activateInitialTab();
        
        initialized = true;
        console.log('[Services] Page initialized');
    }

    /**
     * Get tab from URL parameter
     * @returns {string|null} Tab ID from URL or null
     */
    function getTabFromURL() {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        return VALID_TABS.includes(tab) ? tab : null;
    }

    /**
     * Get tab from session storage
     * @returns {string|null} Tab ID from storage or null
     */
    function getTabFromStorage() {
        try {
            const stored = sessionStorage.getItem(STORAGE_KEY);
            return VALID_TABS.includes(stored) ? stored : null;
        } catch (e) {
            // sessionStorage not available
            return null;
        }
    }

    /**
     * Save active tab to session storage (SVC-032)
     * @param {string} tabId - Tab ID to save
     */
    function saveTabToStorage(tabId) {
        try {
            sessionStorage.setItem(STORAGE_KEY, tabId);
        } catch (e) {
            // sessionStorage not available
        }
    }

    /**
     * Update URL with active tab (SVC-003)
     * @param {string} tabId - Tab ID to set in URL
     * @param {boolean} pushState - Whether to push to history
     */
    function updateURL(tabId, pushState = true) {
        const url = new URL(window.location);
        url.searchParams.set('tab', tabId);
        
        if (pushState) {
            window.history.pushState({ tab: tabId }, '', url);
        } else {
            window.history.replaceState({ tab: tabId }, '', url);
        }
    }

    /**
     * Activate initial tab based on URL, storage, or default (SVC-002)
     */
    function activateInitialTab() {
        // Priority: URL > Storage > Default
        const tabFromURL = getTabFromURL();
        const tabFromStorage = getTabFromStorage();
        const activeTab = tabFromURL || tabFromStorage || DEFAULT_TAB;
        
        // Activate the tab
        activateTab(activeTab, false);
        
        // Update URL if not already set
        if (!tabFromURL) {
            updateURL(activeTab, false);
        }
    }

    /**
     * Activate a specific tab
     * @param {string} tabId - Tab ID to activate
     * @param {boolean} updateHistory - Whether to update browser history
     */
    function activateTab(tabId, updateHistory = true) {
        if (!VALID_TABS.includes(tabId)) {
            console.warn(`[Services] Invalid tab ID: ${tabId}`);
            return;
        }
        
        // Activate desktop tab
        activateDesktopTab(tabId);
        
        // Activate mobile accordion
        activateMobileAccordion(tabId);
        
        // Save to storage
        saveTabToStorage(tabId);
        
        // Update URL
        if (updateHistory) {
            updateURL(tabId);
        }
        
        // Refresh AOS animations (SVC-029)
        refreshAOS();
        
        // Scroll to content on mobile if accordion is visible
        if (window.innerWidth < MOBILE_BREAKPOINT && accordionContainer) {
            const accordionItem = document.getElementById(`accordion-${tabId}`);
            if (accordionItem) {
                setTimeout(() => {
                    accordionItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        }
        
        console.log(`[Services] Activated tab: ${tabId}`);
    }

    /**
     * Activate desktop tab
     * @param {string} tabId - Tab ID to activate
     */
    function activateDesktopTab(tabId) {
        if (!tabsContainer) return;
        
        // Find and activate the tab trigger
        const tabTrigger = tabsContainer.querySelector(`[data-bs-target="#tab-${tabId}"]`);
        if (tabTrigger) {
            const tab = new bootstrap.Tab(tabTrigger);
            tab.show();
        }
    }

    /**
     * Activate mobile accordion
     * @param {string} tabId - Tab ID to activate
     */
    function activateMobileAccordion(tabId) {
        if (!accordionContainer) return;
        
        // Get all accordion collapse elements
        const accordionItems = accordionContainer.querySelectorAll('.accordion-collapse');
        
        accordionItems.forEach(item => {
            const isTarget = item.id === `accordion-${tabId}`;
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance(item, { toggle: false });
            
            if (isTarget) {
                bsCollapse.show();
            } else {
                bsCollapse.hide();
            }
        });
    }

    /**
     * Refresh AOS animations (SVC-029)
     */
    function refreshAOS() {
        if (typeof AOS !== 'undefined') {
            setTimeout(() => {
                AOS.refresh();
            }, 100);
        }
    }

    /**
     * Set up desktop tab event listeners
     */
    function setupTabListeners() {
        if (!tabsContainer) return;
        
        tabsContainer.addEventListener('shown.bs.tab', (event) => {
            // Extract tab ID from the data-bs-target attribute
            const target = event.target.getAttribute('data-bs-target');
            const tabId = target ? target.replace('#tab-', '') : null;
            
            if (tabId && VALID_TABS.includes(tabId)) {
                // Sync accordion
                activateMobileAccordion(tabId);
                
                // Save and update URL
                saveTabToStorage(tabId);
                updateURL(tabId);
                
                // Refresh AOS
                refreshAOS();
            }
        });
    }

    /**
     * Set up mobile accordion event listeners (SVC-028)
     */
    function setupAccordionListeners() {
        if (!accordionContainer) return;
        
        accordionContainer.addEventListener('shown.bs.collapse', (event) => {
            // Extract tab ID from the accordion ID
            const tabId = event.target.id.replace('accordion-', '');
            
            if (VALID_TABS.includes(tabId)) {
                // Sync desktop tab
                activateDesktopTab(tabId);
                
                // Save and update URL
                saveTabToStorage(tabId);
                updateURL(tabId);
                
                // Refresh AOS
                refreshAOS();
            }
        });
    }

    /**
     * Set up browser back/forward navigation listener
     */
    function setupPopStateListener() {
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.tab) {
                activateTab(event.state.tab, false);
            } else {
                // No state, try URL
                const tabFromURL = getTabFromURL();
                if (tabFromURL) {
                    activateTab(tabFromURL, false);
                }
            }
        });
    }

    /**
     * Public API for external access
     */
    window.RushSubaruServices = {
        /**
         * Navigate to a specific service tab
         * @param {string} tabId - Tab ID to navigate to
         */
        goToTab: function(tabId) {
            activateTab(tabId);
        },
        
        /**
         * Get current active tab
         * @returns {string} Current tab ID
         */
        getCurrentTab: function() {
            return getTabFromURL() || getTabFromStorage() || DEFAULT_TAB;
        },
        
        /**
         * Get list of valid tabs
         * @returns {string[]} Array of valid tab IDs
         */
        getValidTabs: function() {
            return [...VALID_TABS];
        },
        
        /**
         * Re-initialize the services page
         */
        reinit: function() {
            initialized = false;
            init();
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Also initialize on window load for safety
    window.addEventListener('load', init);

})();
