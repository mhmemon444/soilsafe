const SOIL_TYPE_MAP = {
    "Rc": "Calcaric Regosols",
    "Ge": "Eutric Gleysols",
    "WR": "Inland Water",
    "ND": "No data"
}

const SOIL_DESC_MAP = {
    "Rc": "They are characterized by a shallow soil profile, typically less than 50 cm deep, and a high content of free calcium carbonate (lime) in the upper part of the soil. The soil is generally skeletal, with a high proportion of rock fragments or coarse fragments.",
    "Ge": "They are characterized by having a high content of organic matter, a dark color, and poor drainage due to the presence of a grayish-blue or greenish-gray color layer caused by the reduction of iron compounds. These soils are typically found in areas with high water tables or in poorly drained depressions.",
    "WR": "Inland Water",
    "ND": "No data"
}

const SOIL_VULN_MAP = {
    "Rc": "Vulnerable to tropical storms and hurricanes due to their shallow soil depth and the presence of rocky outcrops. During heavy rain events associated with tropical storms and hurricanes, the shallow soil profile of Calcaric Regosols can quickly become saturated, leading to erosion, soil loss, and landslides. The rocky outcrops present in these soils can also contribute to soil erosion by acting as barriers to water flow and increasing runoff.",
    "Ge": "Vulnerable to the impacts of tropical storms and hurricanes due to their poor drainage and high water table. Heavy rainfall associated with tropical storms can quickly saturate the soil, leading to flooding, erosion, and landslides. In addition to soil erosion and degradation, tropical storms and hurricanes can also have significant impacts on the ecosystem services provided by Eutric Gleysols.",
    "WR": "Inland Water",
    "ND": "No data"
}

const SOIL_CONSERV_MAP = {
    "Rc": "To minimize the negative impacts of tropical storms and hurricanes on Calcaric Regosols, it is important to implement appropriate soil conservation measures such as <strong>terracing</strong>, <strong>contouring</strong>, and <strong>mulching</strong>. These measures can help to reduce soil erosion and increase water infiltration, improving the soil's ability to withstand heavy rainfall events. In addition, <strong>planting vegetation with deep root systems</strong> can help to stabilize the soil and reduce the risk of landslides.",
    "Ge": "To minimize the negative impacts of tropical storms on Eutric Gleysols, it is important to implement appropriate soil conservation measures, such as <strong>soil cover management</strong>, <strong>riparian buffer zones</strong>, and <strong>vegetative barriers</strong>. These measures can help to reduce soil erosion, increase infiltration, and improve soil structure, thereby improving the soil's ability to withstand heavy rainfall events.",
    "WR": "Inland Water",
    "ND": "No data"
}

const LEGEND_MAP = {
    "Rc": "<div><img src='img/terracing.png' class='legend-img'/>Terracing</div><div><img src='img/ctre.png' class='legend-img'/>Contouring</div><div><img src='img/mulch.png' class='legend-img'/>Mulching</div><div><img src='img/guava.png' class='legend-img'/>Planting deep-rooted trees (e.g. guava)</div>",
    "Ge": "<div><img src='img/soilcovermgmt.png' class='legend-img'/>Soil Cover Management</div><div><img src='img/rbz.png' class='legend-img'/>Riparian Buffer Zone</div><div><img src='img/vb.png' class='legend-img'/>Vegetative Barrier</div>"
}