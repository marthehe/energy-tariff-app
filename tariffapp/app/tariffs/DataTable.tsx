import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tariff } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  tariffs: Tariff[];
}

const DataTable = ({ tariffs }: Props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tariffs
              ? tariffs.map((tariff) => (
                  <TableRow key={tariff.id} data-href="/">
                    <TableCell>
                      <Link href={`/tariffs/${tariff.id}`}>{tariff.name}</Link>{" "}
                    </TableCell>
                    <TableCell>{tariff.description} </TableCell>
                    <TableCell>{tariff.status} </TableCell>
                    <TableCell>
                      {tariff.createdAt.toLocaleDateString()}{" "}
                    </TableCell>
                    <TableCell>
                      {tariff.updatedAt.toLocaleDateString()}{" "}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
