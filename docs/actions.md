# Actions

DD Entity Card supports Home Assistant card actions.

- `tap_action`
- `hold_action`
- `double_tap_action`

---

# Tap Action

```yaml
tap_action:
  action: more-info
```

By default, `more-info` opens the main entity configured in `entity`.

You can also specify a different entity to open:

```yaml
tap_action:
  action: more-info
  entity: sensor.temperature
```

This is useful when the main entity is used for control, but you want the tap action to display information or history for another entity.

For example, a boiler card can use an `input_number` for the target temperature while opening the actual temperature sensor:

```yaml
type: custom:dd-entity-card

entity: input_number.nastavena_teplota_bojlera

name:
  value: Bojler doma

tap_action:
  action: more-info
  entity: sensor.teplota_bojler
```

Clicking the card will open the `sensor.teplota_bojler` more-info dialog instead of the `input_number`.

If `entity` is omitted, the main card entity is used.

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

# Disable Action

```yaml
tap_action:
  action: none
```

---

# Notes

- Controls have their own click handling.
- Clicking a control does not trigger the card `tap_action`.
- If `tap_action.entity` is specified, it overrides the main card entity for the action.
- If no entity is specified, the card's main `entity` is used.
