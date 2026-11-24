import type { ProjectContent } from "../../../nextjs/lib/projects/projects.ts";

const adapterUrl = "https://github.com/saifymatteo/graphql-typesafe-adapter";

export const projectGraphqlTypesafeAdapter: ProjectContent = {
  slug: "graphql-typesafe-adapter",
  category: "personal",
  title: "GraphQL Typesafe Adapter",
  tagline: "GraphQL requests, written as Dart objects.",
  description:
    "A Dart package that builds GraphQL queries and mutations from typed request objects.",
  summary:
    "I turned a GraphQL client I wrote at work into a Dart package. It builds queries and mutations from typed request objects.",
  platform: "Developer tooling",
  role: "Package author",
  techStack: ["Dart", "Flutter", "GraphQL"],
  links: [
    { label: "GitHub", href: adapterUrl },
    {
      label: "pub.dev",
      href: "https://pub.dev/packages/graphql_typesafe_adapter",
    },
  ],
  contents: [
    {
      title: "Why I made it",
      body: [
        "I wanted to build requests with Dart objects instead of writing raw query strings at every call site. The package turns field selection and query composition into a reusable API.",
      ],
    },
    {
      title: "Strings to request objects",
      body: [
        "Both examples select a name using the `graphql` package. The second builds the document with caller-defined request and field-selection classes, then passes it to `gql()`. Those classes aren’t generated from a server schema.",
      ],
      code: [
        {
          label: "A raw GraphQL document",
          source:
            "final document = gql(r'''\n  query SimpleQuery {\n    me {\n      name\n    }\n  }\n''');",
        },
        {
          label: "The same selection, built in Dart",
          source:
            "final query = GqlRequestBuilder().query(\n  queryName: 'SimpleQuery',\n  requests: [\n    MeQuery(\n      responseConfig: UserResponseConfig(\n        includeName: true,\n      ),\n    ),\n  ],\n);\nfinal document = gql(query);",
        },
      ],
      links: [
        {
          label: "Usage and model definitions",
          href: `${adapterUrl}#usage`,
        },
      ],
    },
    {
      title: "Removing hidden mutations",
      body: [
        "The original client mutated caller-owned objects. During extraction, AI-assisted architecture review helped me remove those mutations.",
        "AI also helped with the package’s examples, unit tests and bug finding. The original internal client was handwritten by me.",
      ],
      links: [
        {
          label: "Architecture change",
          href: `${adapterUrl}/commit/2323c8aeec75a970897251d5ca8d0bef57f5dda3`,
        },
      ],
    },
    {
      title: "What the types don’t guarantee",
      body: [
        "The package supports queries and mutations, not subscriptions or GraphQL variables. It interpolates arguments into the document instead of using variable binding.",
        "Typed requests don’t validate a server schema or make returned data type-safe. The caller still owns those responsibilities.",
      ],
    },
  ],
};
