// Privacy Policy Manager

// Sample data structure for privacy policies
let privacyPolicies = JSON.parse(localStorage.getItem('privacyPolicies')) || [];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the privacy policy index page
    const privacyPoliciesList = document.getElementById('privacy-policies-list');
    if (privacyPoliciesList) {
        displayPrivacyPoliciesList();
    }
    
    // Check if we're on a specific privacy policy page
    const policyContainer = document.querySelector('.privacy-policy-container');
    if (policyContainer && !privacyPoliciesList) {
        loadPrivacyPolicyContent();
    }
    
    // Check if we're on the admin page for creating/editing privacy policies
    const policyForm = document.getElementById('privacy-policy-form');
    if (policyForm) {
        setupPrivacyPolicyForm();
    }
});

// Function to display the list of privacy policies
function displayPrivacyPoliciesList() {
    const list = document.getElementById('privacy-policies-list');
    if (!list) return;
    
    if (privacyPolicies.length === 0) {
        list.innerHTML = '<p>No privacy policies have been created yet.</p>';
        return;
    }
    
    const policiesHTML = privacyPolicies.map(policy => `
        <li>
            <a href="privacy-policy.html?id=${policy.id}">${policy.appName}</a>
            <p class="app-description">${policy.appDescription || 'No description available'}</p>
        </li>
    `).join('');
    
    list.innerHTML = policiesHTML;
}

// Function to load a specific privacy policy content
function loadPrivacyPolicyContent() {
    // Get the policy ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const policyId = urlParams.get('id');
    
    if (!policyId) {
        document.querySelector('.privacy-content').innerHTML = '<p>Privacy policy not found.</p>';
        return;
    }
    
    // Find the policy in our data
    const policy = privacyPolicies.find(p => p.id === policyId);
    
    if (!policy) {
        document.querySelector('.privacy-content').innerHTML = '<p>Privacy policy not found.</p>';
        return;
    }
    
    // Update the page title
    document.title = `Privacy Policy - ${policy.appName}`;
    
    // Update the policy header
    document.querySelector('.privacy-header h1').textContent = `Privacy Policy for ${policy.appName}`;
    document.querySelector('.last-updated').textContent = `Last Updated: ${policy.lastUpdated}`;
    
    // Replace placeholders in the content
    const contentSections = document.querySelectorAll('.policy-section');
    
    contentSections.forEach(section => {
        const html = section.innerHTML;
        const updatedHtml = html
            .replace(/\[APP_NAME\]/g, policy.appName)
            .replace(/\[DEVELOPER_NAME\]/g, policy.developerName)
            .replace(/\[LAST_UPDATED_DATE\]/g, policy.lastUpdated)
            .replace(/\[INFORMATION_COLLECTED_DIRECTLY\]/g, policy.infoCollectedDirectly)
            .replace(/\[INFORMATION_COLLECTED_AUTOMATICALLY\]/g, policy.infoCollectedAutomatically)
            .replace(/\[USE_1\]/g, policy.uses[0] || '')
            .replace(/\[USE_2\]/g, policy.uses[1] || '')
            .replace(/\[USE_3\]/g, policy.uses[2] || '')
            .replace(/\[USE_4\]/g, policy.uses[3] || '')
            .replace(/\[SHARING_1\]/g, policy.sharing[0] || '')
            .replace(/\[SHARING_2\]/g, policy.sharing[1] || '')
            .replace(/\[SHARING_3\]/g, policy.sharing[2] || '')
            .replace(/\[THIRD_PARTY_SERVICES\]/g, policy.thirdPartyServices)
            .replace(/\[DATA_RETENTION\]/g, policy.dataRetention)
            .replace(/\[CHILDRENS_PRIVACY\]/g, policy.childrensPrivacy)
            .replace(/\[USER_RIGHTS\]/g, policy.userRights)
            .replace(/\[CONTACT_EMAIL\]/g, policy.contactEmail)
            .replace(/\[CONTACT_ADDRESS\]/g, policy.contactAddress);
        
        section.innerHTML = updatedHtml;
    });
}

// Function to set up the privacy policy form
function setupPrivacyPolicyForm() {
    const form = document.getElementById('privacy-policy-form');
    const editId = new URLSearchParams(window.location.search).get('edit');
    
    // If we're editing an existing policy, populate the form
    if (editId) {
        const policy = privacyPolicies.find(p => p.id === editId);
        if (policy) {
            document.getElementById('app-name').value = policy.appName;
            document.getElementById('app-description').value = policy.appDescription || '';
            document.getElementById('developer-name').value = policy.developerName;
            document.getElementById('info-collected-directly').value = policy.infoCollectedDirectly;
            document.getElementById('info-collected-automatically').value = policy.infoCollectedAutomatically;
            
            // Populate uses
            document.getElementById('use-1').value = policy.uses[0] || '';
            document.getElementById('use-2').value = policy.uses[1] || '';
            document.getElementById('use-3').value = policy.uses[2] || '';
            document.getElementById('use-4').value = policy.uses[3] || '';
            
            // Populate sharing
            document.getElementById('sharing-1').value = policy.sharing[0] || '';
            document.getElementById('sharing-2').value = policy.sharing[1] || '';
            document.getElementById('sharing-3').value = policy.sharing[2] || '';
            
            document.getElementById('third-party-services').value = policy.thirdPartyServices;
            document.getElementById('data-retention').value = policy.dataRetention;
            document.getElementById('childrens-privacy').value = policy.childrensPrivacy;
            document.getElementById('user-rights').value = policy.userRights;
            document.getElementById('contact-email').value = policy.contactEmail;
            document.getElementById('contact-address').value = policy.contactAddress;
        }
    }
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newPolicy = {
            id: editId || Date.now().toString(),
            appName: document.getElementById('app-name').value,
            appDescription: document.getElementById('app-description').value,
            developerName: document.getElementById('developer-name').value,
            lastUpdated: new Date().toLocaleDateString(),
            infoCollectedDirectly: document.getElementById('info-collected-directly').value,
            infoCollectedAutomatically: document.getElementById('info-collected-automatically').value,
            uses: [
                document.getElementById('use-1').value,
                document.getElementById('use-2').value,
                document.getElementById('use-3').value,
                document.getElementById('use-4').value
            ],
            sharing: [
                document.getElementById('sharing-1').value,
                document.getElementById('sharing-2').value,
                document.getElementById('sharing-3').value
            ],
            thirdPartyServices: document.getElementById('third-party-services').value,
            dataRetention: document.getElementById('data-retention').value,
            childrensPrivacy: document.getElementById('childrens-privacy').value,
            userRights: document.getElementById('user-rights').value,
            contactEmail: document.getElementById('contact-email').value,
            contactAddress: document.getElementById('contact-address').value
        };
        
        if (editId) {
            // Update existing policy
            privacyPolicies = privacyPolicies.map(p => p.id === editId ? newPolicy : p);
        } else {
            // Add new policy
            privacyPolicies.push(newPolicy);
        }
        
        // Save to localStorage
        localStorage.setItem('privacyPolicies', JSON.stringify(privacyPolicies));
        
        // Redirect to the privacy policies list
        window.location.href = 'privacy-policies.html';
    });
}

// Function to delete a privacy policy
function deletePrivacyPolicy(id) {
    if (confirm('Are you sure you want to delete this privacy policy?')) {
        privacyPolicies = privacyPolicies.filter(policy => policy.id !== id);
        localStorage.setItem('privacyPolicies', JSON.stringify(privacyPolicies));
        
        // If we're on the list page, refresh the list
        const list = document.getElementById('privacy-policies-list');
        if (list) {
            displayPrivacyPoliciesList();
        } else {
            // If we're on the policy page, redirect to the list
            window.location.href = 'privacy-policies.html';
        }
    }
}
