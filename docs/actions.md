# Actions

DD Entity Card supports the standard Home Assistant actions.

- `tap_action`
- `hold_action`
- `double_tap_action`

If no action is specified, the default Home Assistant behavior is used.

---

# Tap Action

```yaml
tap_action:
  action: more-info
```

Supported actions include:

- `more-info`
- `toggle`
- `navigate`
- `url`
- `perform-action`
- `none`

---

# Hold Action

```yaml
hold_action:
  action: more-info
```

---

# Double Tap Action

```yaml
double_tap_action:
  action: toggle
```

---

# Navigation

```yaml
tap_action:
  action: navigate
  navigation_path: /lovelace/climate
```

---

# URL

```yaml
tap_action:
  action: url
  url_path: https://www.home-assistant.io/
```

---

# Service / Perform Action

```yaml
tap_action:
  action: perform-action
  perform_action: climate.turn_off
  target:
    entity_id: climate.living_room
```

---

# Disable action

```yaml
tap_action:
  action: none
```

---

# Complete example

```yaml
type: custom:dd-entity-card

entity: climate.living_room

tap_action:
  action: more-info

hold_action:
  action: navigate
  navigation_path: /lovelace/climate

double_tap_action:
  action: none
```

---

# Notes

- Controls (Number, Switch, Select) handle their own click events.
- Tapping a control does not trigger the card `tap_action`.
- Clicking elsewhere on the card executes the configured card action.
