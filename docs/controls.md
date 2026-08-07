# Controls

Controls add interactive elements to the right side of the card.

Supported controls:

- Number
- Switch
- Select (Climate)

Controls are rendered in the order they are defined.

---

# Number

Displays minus and plus buttons for `number`, `input_number` and `climate` entities.

```yaml
controls:
  - type: number
```

## Options

| Option | Default | Description |
|---------|---------|-------------|
| `step` | Entity step | Increment/decrement value |
| `entity` | Main entity | Entity to control |

Example

```yaml
controls:
  - type: number
    entity: input_number.temperature
    step: 0.5
```

---

# Switch

Displays a power button.

Supports any `switch` entity.

```yaml
controls:
  - type: switch
```

## Options

| Option | Default | Description |
|---------|---------|-------------|
| `entity` | Main entity | Switch entity to toggle |

Example

```yaml
controls:
  - type: switch
    entity: switch.boiler
```

---

# Climate Select

Displays available HVAC modes.

Supported modes are automatically read from the entity.

```yaml
controls:
  - type: select
```

## Options

| Option | Default | Description |
|---------|---------|-------------|
| `entity` | Main entity | Climate entity |

Example

```yaml
controls:
  - type: select
    entity: climate.living_room
```

Supported modes include:

- Auto
- Heat
- Cool
- Dry
- Fan Only
- Off

---

# Multiple Controls

Controls can be combined.

```yaml
controls:
  - type: number
    step: 0.5

  - type: switch

  - type: select
```

Result:

```
- 22.5 +   ⏻
❄ 🔥 💧 🌀 🔄
```

---

# Future Controls

Planned controls:

- Fan mode
- Preset mode
- Swing mode
- Cover position
- Slider
