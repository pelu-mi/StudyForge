/**
 * Import Modules
 */
import { Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import PropTypes from "prop-types";
import { Platform } from "react-native";

/**
 * ExternalLink
 * 
 * @param {*} props 
 * @returns ExternalLink
 */
export function ExternalLink({ href, ...rest }) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== "web") {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href);
        }
      }}
    />
  );
}

// Specify types of props to be received by ExternalLink
ExternalLink.propTypes = {
  href: PropTypes.string,
};
