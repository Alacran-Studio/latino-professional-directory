import { sendGAEvent } from "@next/third-parties/google";

export function trackOrgClick(orgId: number | string, orgName: string) {
  sendGAEvent("event", "org_click", { org_id: orgId, org_name: orgName });
}

export function trackFeaturedOrgClick(orgId: number | string, orgName: string) {
  sendGAEvent("event", "featured_org_click", {
    org_id: orgId,
    org_name: orgName,
  });
}

export function trackEventClick(eventId: number | string, eventName: string) {
  sendGAEvent("event", "event_click", {
    event_id: eventId,
    event_name: eventName,
  });
}

export function trackFilterApplied(
  filterType: "industry" | "location",
  filterValue: string
) {
  sendGAEvent("event", "filter_applied", {
    filter_type: filterType,
    filter_value: filterValue,
  });
}

export function trackJoinStep1Complete() {
  sendGAEvent("event", "join_step_1_complete", {});
}

export function trackJoinSubmitted() {
  sendGAEvent("event", "join_submitted", {});
}

export function trackJoinSubmitError(errorMessage: string) {
  sendGAEvent("event", "join_submit_error", { error_message: errorMessage });
}

export function trackOrgWebsiteClick(
  orgId: number | string,
  orgName: string
) {
  sendGAEvent("event", "org_website_click", {
    org_id: orgId,
    org_name: orgName,
  });
}

export function trackEventRegisterClick(
  eventId: number | string,
  eventName: string
) {
  sendGAEvent("event", "event_register_click", {
    event_id: eventId,
    event_name: eventName,
  });
}

/** Stub — wire up once the directory search bar (issue #84) ships. */
export function trackDirectorySearch(searchTerm: string) {
  sendGAEvent("event", "directory_search", { search_term: searchTerm });
}
