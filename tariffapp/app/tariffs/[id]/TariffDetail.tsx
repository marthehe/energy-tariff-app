import { Tariff } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ReactMarkDown from "react-markdown";
import DeleteButton from "./DeleteButton";

interface Props {
  tariff: Tariff;
}

const TariffDetail = ({ tariff }: Props) => {
  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="mx-4 mb-4 lg:col-span-3 lg:mr-4">
        <CardHeader>
          <div className="flex justify-between mb-3">
            <div>{tariff.status} </div>
          </div>
          <CardTitle>{tariff.name}</CardTitle>
          <CardDescription>
            Created:{" "}
            {tariff.createdAt.toLocaleDateString("en-US", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <ReactMarkDown>{tariff.description}</ReactMarkDown>
        </CardContent>
        <CardFooter>
          Updated:{" "}
          {tariff.updatedAt.toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </CardFooter>
      </Card>
      <div className="mx-4 flex lg:flex-col lg:mx-0 gap-2">
        <Link
          href={`/tariffs/edit/${tariff.id}`}
          className={`${buttonVariants({
            variant: "default",
          })}`}
        >
          Edit Tariff
        </Link>
        <DeleteButton tariffId={tariff.id} />
      </div>
    </div>
  );
};

export default TariffDetail;
