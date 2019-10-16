# SEMIA

## Sprites

__6969__ videos:

    jq -r '.' < SEMIA_metadata.json | grep vid_id | sort | uniq | wc -l

__103160__ shots:

    jq -r '.' < SEMIA_metadata.json | grep vid_id | wc -l

32 * 16 * 103160 = 52.817.920
20 * 10 * 103160 = 20.632.000
16 * 16 * 103160 = 26.408.960
16 * 8 * 103160 = 13.204.480



In NYPL: 10 * 10 * 193.500 = 19.350.000

## Data

- openbeelden_colour.hdf5
    per shot, 5 dominante kleuren (r, g, b)
    histogram, heel shot, gemiddeld


- openbeelden_vc.hdf5
    per shot, lijst van 5 nummers???
    voor vijf frames in shot, gelijk verspreidt over shot


- openbeelden_resnet.hdf5
    per shot, lijst van 2048 nummers???
    getallen komen uit neuraal netwerk, shorts waar nummers bij elkaar in buurt liggen lijken op elkaar

- openbeelden_flow.hdf5
    per shot, lijst van 432 nummers???
    elk frame in negen vlakken
    histogram
    magnitude van beweging, direction van beweging

## Nanne:

Nanne: shots kloppen behoorlijk
Meer filmpjes toevoegen: nu nog lastig
"19670_36" in data betekent: lijkt meest op: "{video}_{shot}"
Kleur: kleurhistogram
Beweging: optical flow
Shape: neuraal netwerk
Clutter: hoe druk is het beeld, aantal edges, contrast

## Inspiration & Links

http://publicdomain.nypl.org/pd-visualization/
https://github.com/amnh-sciviz/image-collection