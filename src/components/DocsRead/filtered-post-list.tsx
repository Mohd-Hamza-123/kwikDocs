"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type TreeNode = {
  name: string;
  type: "folder" | "file";
  slug?: string;
  title?: string;
  children?: TreeNode[];
};

type SidebarTreeProps = {
  nodes: TreeNode[];
};

function TreeItem({ node }: { node: TreeNode }) {

  const pathname = usePathname();

  if (node.type === "file") {

    const href = `/docs/${node.slug}`;
    const isActive = pathname === href;

    return (
      <li className="ml-4">
        <Link
          href={href}
          className={`block rounded-md px-2 py-1 text-sm transition-colors ${isActive
            ? "bg-accent text-foreground font-medium"
            : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
        >
          {node.title}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <div className="px-2 py-1 text-sm font-semibold text-foreground">{node.name}</div>
      {node.children?.length ? (
        <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
          {node.children.map((child) => (
            <TreeItem key={`${child.type}-${child.name}`} node={child} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function SidebarTree({ nodes}: SidebarTreeProps) {
  return (
    <aside className="w-full max-w-sm bg-background text-foreground">
      <ul className="space-y-2 px-2 py-3">
        {nodes.map((node) => (
          <TreeItem key={`${node.type}-${node.name}`} node={node} />
        ))}
      </ul>
    </aside>
  );
}